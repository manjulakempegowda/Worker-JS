//A Worker is created by passing a JavaScript file to a Worker constructor:
//const worker = new Worker("worker.js");

//The worker.js file contains the code that will run in the background. Once the Worker is created, you can communicate with it by sending messages to it and receiving messages from it.


//Here's a simple example that demonstrates how to use Workers:

// main.js
// const worker = new Worker("worker.js");
// worker.postMessage("start");
// worker.onmessage = (event) => {
//   console.log("Received message from worker:", event.data);
// };

// // worker.js
// self.onmessage = (event) => {
//   console.log("Received message from main:", event.data);
//   self.postMessage("Hello from the worker!");
// };

// Create a new worker, giving it the code in "generate.js"
const worker = new Worker('./generate.js');

// When the user clicks "Generate primes", send a message to the worker.
// The message command is "generate", and the message also contains "quota",
// which is the number of primes to generate.
document.querySelector('#generate').addEventListener('click', () => {
  const quota = document.querySelector('#quota').value;
  worker.postMessage({
    command: 'generate',
    quota,
  });
});

// When the worker sends a message back to the main thread,
// update the output box with a message for the user, including the number of
// primes that were generated, taken from the message data.
worker.addEventListener('message', (message) => {
  document.querySelector('#output').textContent = `Finished generating ${message.data} primes!`;
});

document.querySelector('#reload').addEventListener('click', () => {
  document.querySelector('#user-input').value = 'Try typing in here immediately after pressing "Generate primes"';
  document.location.reload();
});