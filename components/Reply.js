import { motion } from "framer-motion";
import Image from "next/image";

const convertNewLines = (text) => {
  const linkRegex = /(^|\s)(https?:\/\/\S+)/g;
  return text.split("\n").map((line, i) => {
    const matches = line.match(linkRegex);
    if (matches) {
      const parts = line.split(linkRegex);
      return (
        <span key={i}>
          {parts.map((part, j) => {
            if (part.match(linkRegex)) {
              return (
                <a
                  className="text-[#8870FF] hover:underline"
                  key={j}
                  href={part.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {part.trim()}
                </a>
              );
            } else {
              return <span key={j}>{part}</span>;
            }
          })}
          <br />
        </span>
      );
    } else {
      return (
        <span key={i}>
          {line}
          <br />
        </span>
      );
    }
  });
};

function Reply({ message, role }) {
  if (!message) return null;
  const formattedMessage = convertNewLines(message);

  if (role === "system") {
    return null;
  }

  //   if (role === "user") {
  //     return (
  //       <motion.div
  //         animate={{
  //           opacity: [0, 1],
  //         }}
  //         transition={{
  //           duration: 0.2,
  //           delay: 0.2,
  //         }}
  //         className="mt-2 scale-95 flex items-center justify-end"
  //       >
  //         <p className="bg-[#B2A4FF] text-white rounded-3xl p-3 px-4">
  //           {formattedMessage}
  //         </p>
  //       </motion.div>
  //     );
  //   }

  return (
    <motion.div
      animate={{
        opacity: [0, 1],
      }}
      transition={{
        duration: 0.2,
        delay: 0.2,
      }}
      className="mt-2 scale-95 flex items-center justify-start "
    >
      <p
        className={` ${
          role === "user" ? "" : "bg-white"
        } rounded-xl p-4 flex flex-row items-center gap-3`}
      >
        {role === "user" && (
          <Image
            className="w-8 h-8 rounded-full"
            src="https://lh3.google.com/u/0/ogw/AOLn63Eo-76Eo7SgI9xKPm1h2Aug6iFYmj71EiaSgopW=s64-c-mo"
            alt="celeb"
            width={48}
            height={48}
          />
        )}
        {formattedMessage}
      </p>
    </motion.div>
  );
}

export default Reply;
