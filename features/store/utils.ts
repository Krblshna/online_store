import DOMPurify from "dompurify";
import { SizeLabel, SizeType } from "./intefaces";

export function decodeEntities(encodedString: string): string {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = encodedString;
    return DOMPurify.sanitize(
        textArea.value.replaceAll("&nbsp;", "").replaceAll("style=", "")
    );
}

export const SizesConnector = {
    [SizeType.Small]: SizeLabel.Small,
    [SizeType.Medium]: SizeLabel.Medium,
    [SizeType.Large]: SizeLabel.Large,
};

export function getSizeLabel(size: SizeType): string {
    return SizesConnector[size];
}
