# Pre-work - *Memory Game*

**Memory Game** is a Light & Sound Memory game to apply for CodePath's SITE Program. 

Submitted by: **Euvin Keel**

Time spent: **~1.8** hours spent in total (33 minutes for minimum basics, the rest to research and add some additional optional features)

Link to project: https://glitch.com/edit/#!/profuse-lofty-elm?path=README.md%3A10%3A0

## Required Functionality

The following **required** functionality is complete:

* [X] Game interface has a heading (h1 tag), a line of body text (p tag), and four buttons that match the demo app
* [X] "Start" button toggles between "Start" and "Stop" when clicked. 
* [X] Game buttons each light up and play a sound when clicked. 
* [X] Computer plays back sequence of clues including sound and visual cue for each button
* [X] Play progresses to the next turn (the user gets the next step in the pattern) after a correct guess. 
* [X] User wins the game after guessing a complete pattern
* [X] User loses the game after an incorrect guess

The following **optional** features are implemented:

* [X] Any HTML page elements (including game buttons) has been styled differently than in the tutorial
* [X] Buttons use a pitch (frequency) other than the ones in the tutorial
* [X] More than 4 functional game buttons
* [X] Playback speeds up on each turn
* [X] Computer picks a different pattern each time the game is played
* [X] Player only loses after 3 mistakes (instead of on the first mistake)
* [ ] Game button appearance change goes beyond color (e.g. add an image)
* [ ] Game button sound is more complex than a single tone (e.g. an audio file, a chord, a sequence of multiple tones)
* [X] User has a limited amount of time to enter their guess on each turn

The following **additional** features are implemented:

- [ ] List anything else that you can get done to improve the app!

## Video Walkthrough

Here's a walkthrough of implemented user stories:  
A web page, Game button behavior, The Pattern, Objective, Turns, Playing a Clue, Winning the Game:
![](https://i.imgur.com/C91lacz.gif)
Losing the Game, 3 Mistakes:
![](https://i.imgur.com/leAiXIW.gif)
Start/End Button Behavior, Timer
![](https://i.imgur.com/sQYcwf6.gif)

## Reflection Questions
1. If you used any outside resources to help complete your submission (websites, books, people, etc) list them here. 

Google's color picker (just search up color picker)  
https://htmlcheatsheet.com/css/  
https://css-tricks.com/snippets/css/a-guide-to-flexbox/  
https://fonts.google.com/  
https://www.w3schools.com/jsref/met_win_setinterval.asp  
https://www.w3schools.com/jsref/met_win_cleartimeout.asp  
w3schools' documentations on html elements and their events  
stackoverflow for the occasional exception/error/css or html tips  

2. What was a challenge you encountered in creating this submission (be specific)? How did you overcome it? (recommended 200 - 400 words) 
  
There was a lot of CSS and HTML syntax that I forgot or didn't know off the top of my head, and I simply looked them up on 
Google to find cheatsheets or references in order to figure out how to change the design the site. This ranged from how to add a checkbox, 
how to listen to when the user checked or unchecked them, how to change a paragraph element's inner text using javascript, etc.
There were a few errors/exceptions here and there, but I found them relatively easy to fix as they were often syntactical, like a misplaced period or comma.
I did notice that sometimes, when completing the puzzle too quickly, my timer feature would call setInterval on top of another existing setInterval, 
causing the timer to run out twice as fast. I fixed this by ensuring there would only be one setInterval or one setTimeout active every single turn by having
a dedicated cleanup function for both timeouts and intervals, which was necessary since they needed to be cleaned up when stopping the game manually as well.
Other than these minor setbacks, I felt relatively comfortable adding these optional features 
since I've had some past experience doing basic HTML, CSS, and JavaScript.

3. What questions about web development do you have after completing your submission? (recommended 100 - 300 words) 
I would like to know a little more in depth about how real software projects are managed, and how multiple teams of people take on different 
tasks on a website or an online application. I know this project really just scratches the surface of what a web app can be, 
and the real-world products being developed are much more complex and large in scope. Most of my experience programming has been
done on small solo projects or homework assignments, so it would be interesting to see the specific types of problems small teams or divisions
must solve on a daily basis, or even how they are actually divided given some typical project.

4. If you had a few more hours to work on this project, what would you spend them doing (for example: refactoring certain functions, adding additional features, etc). Be specific. (recommended 100 - 300 words) 

If I were dedicated enough to make this the best app it could be, I would probably ask myself how I could set up the code
to become as customizable as possible (such user-defined buttons with user-defined sounds and appearances, changing mistakes allowed, or the timer for every turn). I'd also spend more time
making the code more readable and understandable to other programmers with better comments.
I would also attempt to rewrite the styling of the website and try to learn more about how to implement CSS animations to make the website 
more stylish, clean, or appealing. 
I may even attempt to see if I could rewrite this app in a popular framework, like React, just to gain more practice with frameworks.


## License

    Copyright Euvin Keel

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.