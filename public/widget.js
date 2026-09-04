(function () {
    "use strict";

    // ------------------------------------------------------------------
    // Config & constants
    // ------------------------------------------------------------------

    // const DEFAULT_API_BASE_URL = "http://localhost:5000";
    // const DEFAULT_APP_BASE_URL = "http://localhost:3000";
    const DEFAULT_API_BASE_URL = "https://career-widget-backend.vercel.app";
    const DEFAULT_APP_BASE_URL = "https://career-widget-frontend.vercel.app";
    const JOBS_PER_PAGE = 5;

    // ------------------------------------------------------------------
    // Small utilities
    // ------------------------------------------------------------------

    /** Escapes text before it's interpolated into HTML templates. */
    function escapeHtml(value) {
        const div = document.createElement("div");
        div.textContent = value ?? "";
        return div.innerHTML;
    }

    function debounce(fn, delay) {
        let timer = null;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => fn(...args), delay);
        };
    }

    function uniqueBy(items, getKey) {
        const seen = new Set();
        const result = [];
        items.forEach((item) => {
            const key = getKey(item);
            if (key && !seen.has(key)) {
                seen.add(key);
                result.push(item);
            }
        });
        return result;
    }

    // ------------------------------------------------------------------
    // API layer
    // ------------------------------------------------------------------

    const WidgetApi = {
        async fetchJobs(apiBaseUrl, companyId) {
            const response = await fetch(`${apiBaseUrl}/api/widget/${companyId}/jobs`);
            const result = await response.json();

            if (!result.success) {
                throw new Error("Failed to load jobs");
            }

            return result.data || [];
        },
    };

    // ------------------------------------------------------------------
    // Icons (inline SVG, stroke-based — same family as the apply page's icon set)
    // ------------------------------------------------------------------

    const Icons = {
        filter:
            '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
        list: '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
        mapPin:
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
        briefcase:
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
        graduationCap:
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12.5V17c0 1.5 3 3 6 3s6-1.5 6-3v-4.5"/></svg>',
        clipboard:
            '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3"/><path d="M9 12h6M9 16h6"/></svg>',
    };

    // ------------------------------------------------------------------
    // Status view templates (loading / error / empty)
    // ------------------------------------------------------------------

    const StatusViews = {
        loading() {
            return `<div class="cw-status-box">Loading jobs...</div>`;
        },
        error(message) {
            return `<div class="cw-status-box cw-status-error">${escapeHtml(message)}</div>`;
        },
        empty() {
            return `<div class="cw-status-box">No jobs available</div>`;
        },
    };

    // ------------------------------------------------------------------
    // Markup templates
    // ------------------------------------------------------------------

    const Templates = {
        styles() {
            return `
                <style>
                    #career-widget {
                        font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Arial, sans-serif;
                        color: #111827;
                    }

                    #career-widget * {
                        box-sizing: border-box;
                    }

                    .cw-status-box {
                        padding: 20px;
                        border: 1px solid #e5e7eb;
                        border-radius: 12px;
                        background: #fff;
                        color: #6b7280;
                        font-size: 14px;
                    }

                    .cw-status-error {
                        border-color: #fecaca;
                        background: #fef2f2;
                        color: #dc2626;
                    }

                    .cw-container {
                        max-width: 1100px;
                        margin: auto;
                    }

                    .cw-layout {
                        display: grid;
                        grid-template-columns: 280px 1fr;
                        gap: 24px;
                        align-items: start;
                    }

                    /* ---- Section shell (mirrors the apply page's Section/SectionHeader) ---- */

                    .cw-sidebar,
                    .cw-card {
                        border: 1px solid #e5e7eb;
                        border-radius: 12px;
                        background: #fff;
                        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
                    }

                    .cw-sidebar {
                        padding: 20px;
                    }

                    .cw-section-header {
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        margin-bottom: 16px;
                    }

                    .cw-icon-badge {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 32px;
                        height: 32px;
                        flex-shrink: 0;
                        border-radius: 8px;
                        background: #111827;
                        color: #fff;
                    }

                    .cw-section-header h3 {
                        margin: 0;
                        font-size: 15px;
                        font-weight: 600;
                        color: #111827;
                    }

                    .cw-filter-group {
                        margin-bottom: 14px;
                    }

                    .cw-filter-group:last-of-type {
                        margin-bottom: 0;
                    }

                    .cw-filter-group label {
                        display: block;
                        font-size: 13px;
                        font-weight: 500;
                        margin-bottom: 6px;
                        color: #374151;
                    }

                    .cw-input,
                    .cw-select {
                        width: 100%;
                        padding: 10px 12px;
                        border: 1px solid #d1d5db;
                        border-radius: 8px;
                        font-size: 14px;
                        font-family: inherit;
                        color: #111827;
                        background: #fff;
                        outline: none;
                        transition: border-color 0.15s, box-shadow 0.15s;
                    }

                    .cw-input:focus,
                    .cw-select:focus {
                        border-color: #6366f1;
                        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
                    }

                    .cw-btn,
                    .cw-filter-btn,
                    .cw-page-btn,
                    .cw-view-details {
                        border: none;
                        padding: 10px 16px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 500;
                        font-family: inherit;
                        transition: background-color 0.15s, opacity 0.15s;
                        text-decoration: none;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .cw-filter-btn {
                        width: 100%;
                        background: #ef4444;
                        color: #fff;
                        margin-top: 16px;
                        font-weight: 600;
                    }

                    .cw-filter-btn:hover {
                        background: #dc2626;
                    }

                    .cw-results-panel {
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                    }

                    .cw-results-info {
                        color: #6b7280;
                        font-size: 13px;
                    }

                    .cw-grid {
                        display: grid;
                        gap: 16px;
                    }

                    .cw-card {
                        padding: 24px;
                        transition: box-shadow 0.15s, border-color 0.15s;
                    }

                    .cw-card:hover {
                        border-color: #c7d2fe;
                        box-shadow: 0 4px 12px rgba(79, 70, 229, 0.08);
                    }

                    .cw-title {
                        font-size: 18px;
                        font-weight: 700;
                        margin-bottom: 12px;
                        color: #111827;
                    }

                    .cw-meta {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                        gap: 10px;
                        margin-bottom: 18px;
                    }

                    .cw-meta-item {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        border: 1px solid #e5e7eb;
                        border-radius: 8px;
                        padding: 8px 10px;
                        min-width: 0;
                    }

                    .cw-meta-item svg {
                        flex-shrink: 0;
                        color: #9ca3af;
                    }

                    .cw-meta-text {
                        min-width: 0;
                        overflow: hidden;
                    }

                    .cw-meta-label {
                        font-size: 10px;
                        text-transform: uppercase;
                        letter-spacing: 0.03em;
                        color: #9ca3af;
                        line-height: 1.4;
                    }

                    .cw-meta-value {
                        font-size: 13px;
                        font-weight: 500;
                        color: #111827;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    .cw-description {
                        margin-bottom: 18px;
                        color: #4b5563;
                        font-size: 14px;
                        line-height: 1.55;
                    }

                    .cw-footer {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 12px;
                        flex-wrap: wrap;
                        padding-top: 16px;
                        border-top: 1px solid #f3f4f6;
                    }

                    .cw-actions {
                        display: flex;
                        gap: 8px;
                        flex-wrap: wrap;
                    }

                    .cw-salary {
                        font-weight: 600;
                        color: #111827;
                        font-size: 14px;
                    }

                    .cw-view-details,
                    .cw-about-company {
                        background: #fff;
                        color: #374151;
                        border: 1px solid #d1d5db;
                    }

                    .cw-about-company {
                        border-radius: 9999px;
                        padding: 10px 18px;
                        font-weight: 600;
                    }

                    .cw-view-details:hover,
                    .cw-about-company:hover {
                        background: #f9fafb;
                    }

                    .cw-btn {
                        background: #ef4444;
                        color: #fff;
                        font-weight: 600;
                    }

                    .cw-btn:hover {
                        background: #dc2626;
                    }

                    .cw-pagination {
                        margin-top: 4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 12px;
                        flex-wrap: wrap;
                        font-size: 13px;
                        color: #6b7280;
                    }

                    .cw-page-btn {
                        background: #fff;
                        color: #374151;
                        border: 1px solid #d1d5db;
                    }

                    .cw-page-btn:hover:not(:disabled) {
                        background: #f9fafb;
                    }

                    .cw-page-btn:disabled {
                        color: #d1d5db;
                        cursor: not-allowed;
                    }

                    .cw-empty-state {
                        padding: 20px;
                        border: 1px dashed #e5e7eb;
                        border-radius: 12px;
                        background: #f9fafb;
                        color: #6b7280;
                        font-size: 14px;
                        text-align: center;
                    }

                    @media (max-width: 800px) {
                        .cw-layout {
                            grid-template-columns: 1fr;
                        }
                    }
                </style>
            `;
        },

        sidebar(departments, locations, filters) {
            const departmentOptions = departments
                .map(
                    (department) =>
                        `<option value="${escapeHtml(department._id)}" ${
                            filters.department === department._id ? "selected" : ""
                        }>${escapeHtml(department.name)}</option>`
                )
                .join("");

            const locationOptions = locations
                .map(
                    (location) =>
                        `<option value="${escapeHtml(location._id)}" ${
                            filters.location === location._id ? "selected" : ""
                        }>${escapeHtml(location.city || location.name)}</option>`
                )
                .join("");

            return `
                <aside class="cw-sidebar">
                    <div class="cw-section-header">
                        <div class="cw-icon-badge">${Icons.filter}</div>
                        <h3>Filters</h3>
                    </div>

                    <div class="cw-filter-group">
                        <label for="cw-search">Search</label>
                        <input id="cw-search" class="cw-input" type="text" placeholder="Search jobs" value="${escapeHtml(
                            filters.search
                        )}" />
                    </div>

                    <div class="cw-filter-group">
                        <label for="cw-department">Department</label>
                        <select id="cw-department" class="cw-select">
                            <option value="">All Departments</option>
                            ${departmentOptions}
                        </select>
                    </div>

                    <div class="cw-filter-group">
                        <label for="cw-location">Location</label>
                        <select id="cw-location" class="cw-select">
                            <option value="">All Locations</option>
                            ${locationOptions}
                        </select>
                    </div>

                    <button id="cw-reset-filters" class="cw-filter-btn">Reset Filters</button>
                </aside>
            `;
        },

        metaItem(icon, label, value) {
            if (!value) return "";
            return `
                <div class="cw-meta-item">
                    ${icon}
                    <div class="cw-meta-text">
                        <div class="cw-meta-label">${escapeHtml(label)}</div>
                        <div class="cw-meta-value">${escapeHtml(value)}</div>
                    </div>
                </div>
            `;
        },

        jobCard(job, companyId, appBaseUrl) {
            const location = job.locationId?.city || "Remote";
            const department = job.departmentId?.name || "-";
            const applyUrl = `${appBaseUrl}/careers/apply/${job._id}?companyId=${companyId}`;

            const metaItems = [
                this.metaItem(Icons.mapPin, "Location", location),
                this.metaItem(Icons.briefcase, "Type", job.employmentType),
                this.metaItem(Icons.graduationCap, "Experience", job.experienceLevel),
                this.metaItem(Icons.list, "Department", department),
            ].join("");

            return `
                <div class="cw-card">
                    <h3 class="cw-title">${escapeHtml(job.title)}</h3>

                    <div class="cw-meta">${metaItems}</div>

                    <div class="cw-description">${escapeHtml(job.description)}</div>

                    <div class="cw-footer">
                        <div class="cw-salary">${escapeHtml(job.currency)} ${escapeHtml(job.salaryMin)} - ${escapeHtml(
                job.salaryMax
            )}</div>
                        <div class="cw-actions">
                            <button class="cw-view-details" data-job-id="${escapeHtml(job._id)}">View job details</button>
                            <button class="cw-about-company" data-job-id="${escapeHtml(job._id)}">About company</button>
                            <a class="cw-btn" href="${applyUrl}" target="_blank" rel="noopener">Apply Now</a>
                        </div>
                    </div>
                </div>
            `;
        },

        pagination(currentPage, totalPages) {
            return `
                <div class="cw-pagination">
                    <button class="cw-page-btn" id="cw-prev" ${currentPage === 1 ? "disabled" : ""}>Previous</button>
                    <span>Page ${currentPage} of ${totalPages}</span>
                    <button class="cw-page-btn" id="cw-next" ${currentPage === totalPages ? "disabled" : ""}>Next</button>
                </div>
            `;
        },

        results(paginatedJobs, filteredCount, currentPage, totalPages, companyId, appBaseUrl) {
            if (filteredCount === 0) {
                return `
                    <div class="cw-results-info">Showing 0 jobs</div>
                    <div class="cw-empty-state">No jobs match the current filters.</div>
                `;
            }

            const cards = paginatedJobs.map((job) => this.jobCard(job, companyId, appBaseUrl)).join("");

            return `
                <div class="cw-results-info">Showing ${filteredCount} job${filteredCount === 1 ? "" : "s"}</div>
                <div class="cw-grid">${cards}</div>
                ${this.pagination(currentPage, totalPages)}
            `;
        },
    };

    // ------------------------------------------------------------------
    // Widget instance factory (one per init() call, no shared globals)
    // ------------------------------------------------------------------

    function createCareerWidget(config) {
        const companyId = config.companyId;
        const apiBaseUrl = config.apiBaseUrl || DEFAULT_API_BASE_URL;
        const appBaseUrl = config.appBaseUrl || DEFAULT_APP_BASE_URL;
        const container = document.getElementById(config.containerId || "career-widget");

        if (!container) {
            console.error("Career Widget: container element not found");
            return null;
        }

        const state = {
            jobs: [],
            departments: [],
            locations: [],
            filters: { search: "", department: "", location: "" },
            currentPage: 1,
        };

        function getFilteredJobs() {
            return state.jobs.filter((job) => {
                const searchText = `${job.title || ""} ${job.description || ""} ${
                    job.departmentId?.name || ""
                } ${job.locationId?.city || ""}`.toLowerCase();

                const matchesSearch =
                    !state.filters.search || searchText.includes(state.filters.search.toLowerCase());
                const matchesDepartment =
                    !state.filters.department || job.departmentId?._id === state.filters.department;
                const matchesLocation =
                    !state.filters.location || job.locationId?._id === state.filters.location;

                return matchesSearch && matchesDepartment && matchesLocation;
            });
        }

        function renderResults() {
            const resultsPanel = container.querySelector(".cw-results-panel");
            if (!resultsPanel) return;

            const filteredJobs = getFilteredJobs();
            const totalPages = Math.max(1, Math.ceil(filteredJobs.length / JOBS_PER_PAGE));

            if (state.currentPage > totalPages) {
                state.currentPage = totalPages;
            }

            const start = (state.currentPage - 1) * JOBS_PER_PAGE;
            const paginatedJobs = filteredJobs.slice(start, start + JOBS_PER_PAGE);

            resultsPanel.innerHTML = Templates.results(
                paginatedJobs,
                filteredJobs.length,
                state.currentPage,
                totalPages,
                companyId,
                appBaseUrl
            );

            bindResultsEvents(totalPages);
        }

        function bindResultsEvents(totalPages) {
            container.querySelectorAll(".cw-view-details").forEach((button) => {
                button.addEventListener("click", () => {
                    const jobId = button.dataset.jobId;
                    window.location.href = `${appBaseUrl}/details?companyId=${companyId}&jobId=${jobId}`;
                });
            });

            container.querySelectorAll(".cw-about-company").forEach((button) => {
                button.addEventListener("click", () => {
                    const jobId = button.dataset.jobId;
                    window.location.href = `${appBaseUrl}/details?companyId=${companyId}&jobId=${jobId}#company-info`;
                });
            });

            container.querySelector("#cw-prev")?.addEventListener("click", () => {
                if (state.currentPage > 1) {
                    state.currentPage -= 1;
                    renderResults();
                }
            });

            container.querySelector("#cw-next")?.addEventListener("click", () => {
                if (state.currentPage < totalPages) {
                    state.currentPage += 1;
                    renderResults();
                }
            });
        }

        function bindSidebarEvents() {
            const searchInput = container.querySelector("#cw-search");
            const departmentSelect = container.querySelector("#cw-department");
            const locationSelect = container.querySelector("#cw-location");
            const resetButton = container.querySelector("#cw-reset-filters");

            searchInput?.addEventListener(
                "input",
                debounce((event) => {
                    state.filters.search = event.target.value;
                    state.currentPage = 1;
                    renderResults();
                }, 250)
            );

            departmentSelect?.addEventListener("change", (event) => {
                state.filters.department = event.target.value;
                state.currentPage = 1;
                renderResults();
            });

            locationSelect?.addEventListener("change", (event) => {
                state.filters.location = event.target.value;
                state.currentPage = 1;
                renderResults();
            });

            resetButton?.addEventListener("click", () => {
                state.filters = { search: "", department: "", location: "" };
                state.currentPage = 1;
                searchInput.value = "";
                departmentSelect.value = "";
                locationSelect.value = "";
                renderResults();
            });
        }

        function render() {
            container.innerHTML = `
                ${Templates.styles()}
                <div class="cw-container">
                    <div class="cw-layout">
                        ${Templates.sidebar(state.departments, state.locations, state.filters)}
                        <div class="cw-results-panel"></div>
                    </div>
                </div>
            `;

            bindSidebarEvents();
            renderResults();
        }

        async function load() {
            container.innerHTML = StatusViews.loading();

            try {
                const jobs = await WidgetApi.fetchJobs(apiBaseUrl, companyId);

                if (jobs.length === 0) {
                    container.innerHTML = StatusViews.empty();
                    return;
                }

                state.jobs = jobs;
                state.departments = uniqueBy(jobs.map((job) => job.departmentId), (d) => d?._id);
                state.locations = uniqueBy(jobs.map((job) => job.locationId), (l) => l?._id);

                render();
            } catch (error) {
                console.error(error);
                container.innerHTML = StatusViews.error("Error loading widget");
            }
        }

        return { load };
    }

    // ------------------------------------------------------------------
    // Public API
    // ------------------------------------------------------------------

    window.CareerWidget = {
        init(config) {
            const widget = createCareerWidget(config || {});
            if (widget) {
                return widget.load();
            }
        },
    };
})();