1. input (text field)
    * get the current value of the text field
    * if the current value is an empty string, hide and/or empty the results container
    * loop through all the countries and add the ones that start with the current value of the text field to a list of matches
        * `startsWith` is convenient but newer
        * `indexOf` is good for compatibility
        * use `toLowerCase` on both country and value for case insensitivity
    * limit list of matches to 4
        * `slice` the array of results after the loop
        * or break out of the loop when length of the matches reaches 4
    * if there are no matches (i.e., the length of the array of matches is 0) show the "no results" message
    * if there the length of the matches list is 1 or greater, loop through the matches and produce html for each one
        * update the DOM once. Build up a string in a loop through the matches and after the loop put the string into the result container element

2. mouseover (individual results)
    * event delegation makes it so you don't have to add mouseover events every time you show new results and jQuery makes event delegation easy to set up
    * remove the highlight class from any element that currently has it
    * add the highlight class to the event target

3. mousedown (individual results)
    * set the value of the input field to the text contained by the event target
    * empty and/or hide the results

4. keydown (text field)
    * down arrow (40)
        * if no result has the highlight class, add the highlight class to the first result
        * if the last result has the highlight class, do nothing
        * if a result other than the last one has the highlight class, remove the highlight class from the element that has it and add it to the next one
    * up arrow (38)
        * if no result has the highlight class, add the highlight class to the last result
        * if the first result has the highlight class, do nothing
        * if a result other than the first one has the highlight class, remove the highlight class from the element that has it and add it to the previous one
    * enter/return (13)
        * set the value of the input field to the text contained by the element that has the highlight class
        * empty and/or hide the results

5. focus (text field)
    * show the results for the text currently in the text field
        * i.e., do exactly what you do when an input event happens

6. blur (text field)
    * hide and/or empty the results container
