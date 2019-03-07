// custom middleware to ensure id is loosely equal to an integer
// to be used in an if statement...
// true if so
// false if not
numberIdCheck = (id) => {
    const numCheckpoint = Number(id); // change current id (string) into numerical value if possible
    if (numCheckpoint) { // if it passes as a number, proceed
        if (Number.isInteger(numCheckpoint)) { // check if numerical value passes an integer
            return true; // if so, it has passed both tests
        } else return false; // otherwise, don't.
    } else return false; // ...
}
module.exports = numberIdCheck;