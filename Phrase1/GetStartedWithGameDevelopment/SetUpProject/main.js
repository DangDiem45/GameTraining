// main.js
// document.addEventListener('DOMContentLoaded', function() {
//     greet();
//     console.log("Sum:", calculateSum(5, 3));
// });
import { greet } from './file1.js';
import { calculateSum } from './file2.js';

document.addEventListener('DOMContentLoaded', function() {
    greet();
    console.log("Sum:", calculateSum(5, 3));
});