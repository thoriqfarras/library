# library

Live at: https://thoriqfarras.github.io/library/

## Reflection
### Wins 👑
- Managed to implement the adding, editing, and deleting logic modularly (unlike the initial logic in my etch-to-sketch project) – although I have to admit, I only found my way to it because I was so desperate with the initial logic that I made I resorted to 'peeking' at other people's codes, in particular the legendary michalosman (to which I say thank you).
- Managed to create popups – (03/05/23) I stored all the popups in my html and activate them by toggling a trigger class. I don't know what's the best way to popups but hey, mine works wonderfully.
- Managed to create custom radio buttons – this one I'm particularly proud of. I essentially put the labels on top of the input field and because each label is associated with their respective radio button, despite it blocking them, they still accept user inputs.
### Hurdles 🚧
- Implementing the logic of adding, editing, and deleting – again, I had to peek at michalosman's first commit to see how he implements his logic and from there created my own. I think my issue is with the design of the logic because it's always been difficult for me to think of a way to structure my codes in a way that represents the logic clearly (e.g. how to implement the function, whether or not to use global variables, etc.). This was made trickier by the use of popups as I had to take into account the buttons that are responsible to display/close the popup and those that implement the logic of adding, editing, and deleting.
- Making the library grid refresh everytime there's a change to the library – I'd overthought this when turns out I only need three one simple function: `updateLibraryGrid` that redraws the grid whenever there's a change in the library array (I'm sure there are far more efficient way of doing this tho).
### Takeaway 🛄
- I have to keep building on my logic as I think it's one of my weakest area so far.

Also, check out [this issue](https://github.com/thoriqfarras/library/issues/2#issue-1694171647) for features that will be added in the future as I learn more about web development!

*Ignore the 60+ commits as 3/4 of them are just my messing around and then failing in the end :I*
