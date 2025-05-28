// Necessary Imports (you will need to use this)
const { Student } = require("./Student");
const fs = require("node:fs/promises");

/**
 * Node Class (GIVEN, you will need to use this)
 */
class Node {
  // Public Fields
  data; // Student
  next; // Object
  /**
   * REQUIRES:  The fields specified above
   * EFFECTS:   Creates a new Node instance
   * RETURNS:   None
   */
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

/**
 * Create LinkedList Class (for student management)
 * The class should have the public fields:
 * - head, tail, length
 */
class LinkedList {
  // Public Fields
  head; // Object
  tail; // Object
  length; // Number representing size of LinkedList

  /**
   * REQUIRES:  None
   * EFFECTS:   Creates a new LinkedList instance (empty)
   * RETURNS:   None
   */
  constructor() {
    this.head = null;
    this.tail = this.head;
    this.length = 0;
  }

  /**
   * REQUIRES:  A new student (Student)
   * EFFECTS:   Adds a Student to the end of the LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about adding to the 'end' of the LinkedList (Hint: tail)
   */
  addStudent(newStudent) {
    if (!newStudent) return undefined;
    const newNode = new Node(newStudent);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = this.head;
      this.length++;
      return;
    }

    this.tail.next = newNode;
    this.tail = this.tail.next;
    this.length++;
  }

  /**
   * REQUIRES:  email(String)
   * EFFECTS:   Removes a student by email (assume unique)
   * RETURNS:   None
   * CONSIDERATIONS:
   * - Think about the null case
   * - Think about how removal might update head or tail
   */
  removeStudent(email) {
    if (!email || this.length < 1) return undefined;
    let current = this.head;
    let previous = current;

    while (current) {
      if (current.data.getEmail() === email) {
        if (this.length === 1) {
          this.head = null;
          this.tail = null;
        } else if (current === this.head) {
          this.head = this.head.next;
        } else if (current === this.tail) {
          previous.next = null;
          this.tail = previous;
        } else {
          previous.next = current.next;
        }
        this.length--;
        return;
      }
      previous = current;
      current = current.next;
    }
    return -1;
  }

  /**
   * REQUIRES:  email (String)
   * EFFECTS:   None
   * RETURNS:   The Student or -1 if not found
   */
  findStudent(email) {
    if (!email || this.length < 1) return undefined;
    let current = this.head;
    while (current) {
      if (current.data.getEmail() === email) {
        return current.data;
      }
      current = current.next;
    }
    return -1;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   Clears all students from the Linked List
   * RETURNS:   None
   */
  clearStudents() {
    if (this.length < 1) return undefined;
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   LinkedList as a String for console.log in caller
   * CONSIDERATIONS:
   *  - Let's assume you have a LinkedList with two people
   *  - Output should appear as: "JohnDoe, JaneDoe"
   */
  displayStudents() {
    let current = this.head;
    let str = "";
    while (current) {
      if (current === this.tail) {
        str += current.data.getName();
      } else {
        str += current.data.getName() + ", ";
      }
      current = current.next;
    }
    return str;
  }

  /**
   * REQUIRES:  None
   * EFFECTS:   None
   * RETURNS:   A sorted array of students by name
   */
  #sortStudentsByName() {
    if (this.length < 1) return [];
    let current = this.head;
    const arr = [];
    while (current) {
      arr.push(current.data);
      current = current.next;
    }
    return this.#sortStudentsAlphabeticallyByName(arr);
  }

  /**
   * REQUIRES:  An array of Students
   * EFFECTS:   None
   * RETURNS:   An array of Students sorted alphabetically by name
   */
  #sortStudentsAlphabeticallyByName(arrayOfStudents) {
    function compareFn(a, b) {
      const nameA = a.getName().toUpperCase();
      const nameB = b.getName().toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    }
    return arrayOfStudents.sort(compareFn);
  }

  /**
   * REQUIRES:  specialization (String)
   * EFFECTS:   None
   * RETURNS:   An array of students matching the specialization, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterBySpecialization(specialization) {
    if (!specialization) return undefined;
    if (this.length < 1) return [];

    let current = this.head;
    const arr = [];

    while (current) {
      if (current.data.getSpecialization() === specialization) {
        arr.push(current.data);
      }
      current = current.next;
    }

    return this.#sortStudentsAlphabeticallyByName(arr);
  }

  /**
   * REQUIRES:  minAge (Number)
   * EFFECTS:   None
   * RETURNS:   An array of students who are at least minAge, sorted alphabetically by student name
   * CONSIDERATIONS:
   * - Use sortStudentsByName()
   */
  filterByMinYear(minYear) {
    if (minYear === 0 || this.length < 1) return [];
    if (!minYear) return undefined;

    let current = this.head;
    const arr = [];

    while (current) {
      if (current.data.getYear() >= minYear) {
        arr.push(current.data);
      }
      current = current.next;
    }

    return this.#sortStudentsAlphabeticallyByName(arr);
  }

  /**
   * REQUIRES:  A valid file name (String)
   * EFFECTS:   Writes the LinkedList to a JSON file with the specified file name
   * RETURNS:   None
   */
  async saveToJson(fileName) {
    if (!fileName) return undefined;
    if (typeof fileName !== "string") return undefined;
    const fileExt = fileName.substring(fileName.length - 5);
    if (fileExt !== ".json") return undefined;

    let current = this.head;
    let arr = [];

    while (current) {
      const student = {
        name: current.data.getName(),
        year: current.data.getYear(),
        email: current.data.getEmail(),
        specialization: current.data.getSpecialization(),
      };
      arr.push(student);
      current = current.next;
    }

    const json = JSON.stringify(arr);

    try {
      const promise = fs.writeFile(fileName, json);
      await promise;
    } catch (error) {
      console.log(error);
    }

    return;
  }

  /**
   * REQUIRES:  A valid file name (String) that exists
   * EFFECTS:   Loads data from the specified fileName, overwrites existing LinkedList
   * RETURNS:   None
   * CONSIDERATIONS:
   *  - Use clearStudents() to perform overwriting
   */
  async loadFromJSON(fileName) {
    this.clearStudents();
    let jsonData = [];
    try {
      const promise = fs.readFile(fileName, "utf8");
      jsonData = await promise;
    } catch (error) {
      console.log(error);
    }

    const llData = JSON.parse(jsonData);

    llData.forEach((student) => {
      const newStudent = new Student(
        student.name,
        student.year,
        student.email,
        student.specialization
      );
      this.addStudent(newStudent);
    });

    return;
  }
}

module.exports = { LinkedList };
