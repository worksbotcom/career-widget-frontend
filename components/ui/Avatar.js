export default function Avatar({

    src,

    alt

}) {

    return (

        <img

            src={src || "/avatar.png"}

            alt={alt}

            className="h-12 w-12 rounded-full object-cover"

        />

    );

}