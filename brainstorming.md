# Brainstorming
Part 1)
    Part 1 is completed though this is an explanation of what the code is meant to represents
    The JSON syntax of the code was incorrect occuasoinally apppending an extra bracket "}" to
    the end of the Buffer. To resolve this issue I convertede the Buffer to a string, checking whether
    the synatx error was occuring. If theerre was an error in the syntax then the last character was sliced
    and this new msg wiht correct syntax was then parsed.

Part 2) 
    I was not able to implement completely part 2 though I think my logic is sound. I aimed to use the data parsed in
    part 1 and evaluate the temeperature of the battery. If the battery temperature was outside the working window,
    I was then going to append this to a text file called Battery-Temp.txt where each line of the file would be read,
    starting from the last (last temp) line, comparing the times of the time just received with that.

    This would be implemented wihtin the loop where the next newest line would continue to be read until it was older than five seconds.
    While the loop was running a counter would track the number of times were within the five seconds, and if the number excede three then
    the time of the data just received would be appended to Battery-Temp.txt and logged to the required file incidents.log.
    To aid in my implementation of this part I looked into npm modules which completed reading files line by line as I believe
    Javascript does not have an fgets() similalr to C, also I did not want to try and reinvent the wheel. 

Part 3)
    I do not have any experience coding front end applications, although to make the interface more aesthetically pleasing I would move the
    temerpatuer value to the centre of the page, making that the focal point while putting the text below the number instead.
    I believe the minimal design is key and not too distracting. Apart form the design specificaiton to make the temperatures outside the 
    randge red, I beleive values which are inside the range should be green, and to indicate any trends and if values are approaching boundary
    values close to 80 and 2 degrees, the number should be displayed in yellow or orange.