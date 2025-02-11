import Image from "next/image";
import githubWhite from "../../../../../public/github-mark-white.svg";
import githubBlack from "../../../../../public/github-mark.svg";
import { AUTHOR_GITHUB, PROJECT_REPO } from "@/config";

export default function Footer() {
  return (
    <footer className="flex justify-around items-center h-10 mb-1 text-xs md:text-sm no-print">
      <p className="flex gap-1">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href={AUTHOR_GITHUB}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Albert Wales
        </a>
      </p>
      <a
        href={PROJECT_REPO}
        target="_blank"
        rel="noopener noreferrer"
        className="flex gap-2 justify-center items-center group"
      >
        <div className="w-4 md:w-6">
          <Image
            src={githubWhite}
            alt="GitHub Logo White"
            className="hidden dark:block"
          />
          <Image
            src={githubBlack}
            alt="GitHub Logo Black"
            className="block dark:hidden"
          />
        </div>
        <span className="group-hover:underline">View on GitHub</span>
      </a>
    </footer>
  );
}
