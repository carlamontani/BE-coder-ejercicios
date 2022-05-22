import { exec, execFile } from "child_process";

//FIX para usar dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

exec("ls -lh", (err, stdout, stderr) => {
  if (err) {
    console.log("Error", err);
    return;
  }
  if (stderr) {
    console.log("stderr", stderr);
    return;
  }
  console.log("Salida", stdout);
});

console.log("Hola coderhouse");

execFile(__dirname + "/sh.sh", (err, stdout, stderr) => {
  if (err) {
    console.log("Error", err);
    return;
  }
  if (stderr) {
    console.log("stderr", stderr);
    return;
  }
  console.log("Salida execFile", stdout);
});

for (let i = 0; i < 2e4; i++) {
  console.log(i);
}