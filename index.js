// Necessary Imports, DO NOT REMOVE
const { LinkedList } = require("./LinkedList");
const { Student } = require("./Student");
const readline = require("readline");

// Initialize terminal interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Creates the Student Management System as a Linked List
/**
 * studentManagementSystem is the object that the main() function will be modifying
 */
const studentManagementSystem = new LinkedList();

// Display available commands
function main() {
  console.log(`
      Available Commands:
      - add [name] [year] [email] [specialization]: Add a student
      - remove [email]: Remove a student by email
      - display: Show all students
      - find [email]: Find a student by email
      - save: Save the current linked list to the specified file
      - load [fileName]: Load a linked list from a file
      - clear: Clear the current linked list
      - q: Quit the terminal
  `);
}

// Command handling logic
async function handleCommand(command) {
  const [operation, ...args] = command.trim().split(" ");

  switch (operation) {
    case "add":
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (code is given)
       *   - Use implemented functions in LinkedList to add the Student, and display the updated LinkedList
       */
      console.log("Adding student...");
      const [name, year, email, specialization] = args;
      // --------> WRITE YOUR CODE BELOW
      const newStudent = new Student(name, year, email, specialization);
      studentManagementSystem.addStudent(newStudent);
      console.log("New student added!");
      console.log(studentManagementSystem);
      // --------> WRITE YOUR CODE ABOVE
      break;

    case "remove":
      /**
       * TODO:
       *  Removes a particular student by email
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (removeEmail)
       *   - Use implemented functions in LinkedList to remove the Student, and display the updated LinkedList
       */
      console.log("Removing student...");
      // --------> WRITE YOUR CODE BELOW
      if (args.length < 1) {
        console.log("Please specify an email to remove student");
        break;
      }
      if (studentManagementSystem.length < 1) {
        console.log("No students to remove");
        break;
      }
      const removeEmail = args[0];
      studentManagementSystem.removeStudent(removeEmail);
      console.log("Student successfully removed!");
      console.log(studentManagementSystem);
      // --------> WRITE YOUR CODE ABOVE
      break;

    case "display":
      /**
       * TODO:
       *  Displays the students in the Linked List
       *  You will need to do the following:
       *   - Use implemneted functions in LinkedList to display the student
       */
      console.log("Displaying students...");
      // --------> WRITE YOUR CODE BELOW
      if (studentManagementSystem.length < 1) {
        console.log("No students to display");
        break;
      }
      console.log(studentManagementSystem.displayStudents());
      // --------> WRITE YOUR CODE ABOVE
      break;

    case "find":
      /**
       * TODO:
       *  Finds a particular student by email, and returns their information
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (findEmail)
       *   - Use implemented functions in LinkedList to grab the Student
       *   - Use implemented functions in Student to display if found, otherwise, state "Student does not exist"
       */
      console.log("Finding student...");
      // --------> WRITE YOUR CODE BELOW
      const findEmail = args[0];
      if (args.length < 1) {
        console.log("Please specify a student email to find");
        break;
      }
      if (studentManagementSystem.length < 1) {
        console.log("No students to find");
        break;
      }
      const foundStudent = studentManagementSystem.findStudent(findEmail);
      if (foundStudent === -1) {
        console.log("Student does not exist");
      } else {
        console.log(foundStudent.getString());
      }
      // --------> WRITE YOUR CODE ABOVE
      break;

    case "save":
      /**
       * TODO:
       *  Saves the current LinkedList to a specified JSON file
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (saveFileName)
       *   - Use implemented functions in LinkedList to save the data
       */
      console.log("Saving data...");
      // --------> WRITE YOUR CODE BELOW
      const saveFileName = args[0];
      if (args.length < 1) {
        console.log("Please specify a file name to save to");
        break;
      }
      if (studentManagementSystem.length < 1) {
        console.log(
          "List is empty. Please add students to the list before saving"
        );
        break;
      }
      const fileExt = args[0].substring(args[0].length - 5);
      if (fileExt !== ".json") {
        console.log(
          "Not a valid file format. Please specify a file name with .json extension"
        );
        break;
      }
      async function saveData() {
        await studentManagementSystem.saveToJson(saveFileName);
        console.log("Data saved successfully!");
      }
      saveData();
      // --------> WRITE YOUR CODE ABOVE
      break;

    case "load":
      /**
       * TODO:
       *  Loads data from specified JSON file into current Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Grab the args (loadFileName)
       *   - Use implemented functions in LinkedList to save the data, and display the updated LinkedList
       */
      console.log("Loading data...");
      // --------> WRITE YOUR CODE BELOW
      const loadFileName = args[0];
      async function loadData() {
        await studentManagementSystem.loadFromJSON(loadFileName);
        console.log("Data successfully loaded!");
        console.log(studentManagementSystem);
      }
      loadData();
      // --------> WRITE YOUR CODE ABOVE
      break;

    case "clear":
      /**
       * TODO:
       *  Clears all data in the Linked List
       *  You will need to do the following:
       *   - Implement LinkedList (run tests locally to check implementation)
       *   - Use implemented functions in LinkedList to clear the data
       */
      console.log("Clearing data...");
      // --------> WRITE YOUR CODE BELOW
      if (studentManagementSystem.length < 1) {
        console.log("List is already empty");
        break;
      }
      studentManagementSystem.clearStudents();
      console.log("Data successfully cleared!");
      // --------> WRITE YOUR CODE ABOVE
      break;

    case "q":
      console.log("Exiting...");
      rl.close();
      break;

    default:
      console.log('Unknown command. Type "help" for a list of commands.');
      break;
  }
}

// Start terminal-based interaction (DO NOT MODIFY)
console.log("Welcome to the Student Management System!");
main();
rl.on("line", async (input) => {
  if (input.trim().toLowerCase() === "help") {
    main();
  } else {
    await handleCommand(input);
  }
});
rl.on("close", () => {
  console.log("Goodbye!");
});
