import type { TaskTypes } from "../models/log";
import { generateOutput } from "./generateOutput";

export const downloadOutputLog = (tasks: TaskTypes[], filename = 'output.log') => {
    // get the output string
    const output = generateOutput(tasks);
    // convert to blob with the text/plain type
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });

    // simple download function using blob
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
