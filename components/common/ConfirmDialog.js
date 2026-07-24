"use client";

import Button from "../ui/Button";

export default function ConfirmDialog({

    title,

    message,

    onConfirm,

    onCancel

}) {

    return (

        <div className="rounded-xl bg-white p-6">

            <h2 className="text-xl font-bold">

                {title}

            </h2>

            <p className="mt-3">

                {message}

            </p>

            <div className="mt-6 flex gap-3">

                <Button
                    variant="danger"
                    onClick={onConfirm}
                >
                    Confirm
                </Button>

                <Button
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

            </div>

        </div>

    );

}