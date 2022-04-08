## Designory FED test rationale

At a high level, what I wanted to display in this project was 
* How I route data through an app
* How I might structure data that gets sent to a front-end from a back-end (if I have control over it, in the case of a CMS or a build process)
* Accuracy in design 
* Show ability to create UX elements
* Understanding of SEO
* Understanding of future proofing a web page for multiple developers to work on it
* My thought process 

## Directory Structure

The src folder follows the following structure:

* `src`
  *  `assets` - static assets like `logo.svg`
  *  `components` - js components
  *  `hooks` - hooks for repeat logic
  *  `styles`
     * `components` - map to js components
     * `global` - for use everywhere. styles that multiple files do or could use - things like helper classes for flex for dynamic layouts.
  * `App.js` - highest order component - in this case the entire page dictating the layout.
  * `data.js` - file that exports json data to populate content on the page. In a real project instead of importing this file we might query some endpoint to get this data. In the case of an SSG like gatsby an object similar to the one exported in `data.js` would get populated with graphql data on build.
  * `index.js` - entry point

## jsconfig.json

I added this file to modify the base url of the project to `src` so that every import can be absolute. I find this makes it much easier to know what you're importing. Further, this makes refactoring *sooo* much easier. Moving files around and having to change imports that use relative paths makes me want to rip my hair out.

## CSS Modules

I chose to use css modules (scss modules) because of my comfortability with them, and my belief  in them as websites scale. The benefits that css modules provide are that the name gets hashed in the dom, meaning that two instances of the same classname never conflict with one another, which can be a problem as codebases scale and people lazily enter into css into files that are used throughout the site. Also because the classnames change on build, this helps with not delivering old cached css files to return users. Finally, from a code perspective, it's just nice to see all of your JS components have small, modular css files that are attached to them. I try my best to have 1-to-1 mapping between js components and css components. In fact, if a js component doesn't need a css component, it can be a good sign that maybe the js component you made is too specialized and may be more useful if abstracted to be a more general component. 

## Hooks
The only hook I used was `useWindowSize.js`  - this helped me to keep track of the window size so I could rerender content and not have to hide content, but instead remove it from the DOM entirely. Because I was using the same logic in multiple components - `<MobileHeader />` and `<FiftyFifty />` I abstracted the logic into a hook and then just referenced it in both components. 

## Component rationale

 **MobileHeader/Header** 

This created the most headaches for me. I attempted to create a header that made use of two distinct UX elements. I used the npm package `react-headroom` to create a header that hides on scroll down and shows on scroll up, and I created a custom hamburger menu that re-renders the menu using a hook that listens to the `window.innerHeight`. I've used this package before and it can be a little bit difficult to use due to the lack of hook/callback functions. I used it on Axel Olson's website to show/hide header and footer and it works great, but I had to write some custom code to get the footer working in conjunction with the header. I was aware that I might run into some problems here with the  two working together but I decided to just try it anyways.

Exactly what I thought would happen, did. The logic that decides when to hide the header is tied to things like the height of the header, and somehow when I would scroll down the page, then scroll up to display the header again, and click on the hamburger menu, as the hamburger menu opened, headroom would hide the header.

In order to combat this I disabled the header before I opened it with the state, and then using a timeout (225 - to keep up with the 0.2s animation time, and give myself a margin of 0.025s) to re-enable it.

However, it's still a little bit buggy, as there's essentially a race between headroom and my custom code to see if the header gets hidden on close. 

The right way to do this would be to rip out headroom and write it all custom, removing whatever logic uses the height of the header to modify the css `translate` value, but this is close enough.

`<App />` is using `<MobileHeader {...} />` (the header with the hamburger), but I also included <`Header {...} />` which can be found commented out in the render function of `<App />` which doesn't make use of the hamburger. 

**Hero**
Pretty standard, added a little animation on hover/focus for the button. Responsive.

**Article**
Again pretty standard, added a pretty dramatic hover/focus animation to the articles. Feel like it looks pretty cool but it might be way too much also. If I was doing this on a real project, I wouldn't just add random hover effects without a designer/UX person specifically telling me to do it. Sometimes I'll tell designers that I think something could be cool and they might agree and then I might whip something like this up, but in this case I just went for it cause no one has to pay for it and I wanted to do it :)

**FiftyFifty**
This was the most intense "data"-wise. When I first saw it, I thought it was a pretty simple design but then I realized that the classic issue with half a side being an image and half a side being a wysiwyg or something similar on *desktop* is that when you just stack the items on mobile it creates a bit of confusion. On desktop you see the image and the title at the same time and the two work together, but in this case when you stack the image and then the title, as a mobile user you have to scroll past the whole image before you see the title at all - leading you to think "what is this image? what does it mean, what is it trying to convey?" typically having a title *before* the image makes the image make a lot more sense and creates more of a sense of a logical narrative/idea as the user goes down the page.

The technical difficulty here is how do you switch these items around? The easy approach is obviously just creating a clone of the same item twice and hiding one on desktop, and the other on mobile with css breakpoints. 

However google doesnt like this - you can get dinged for having duplicate items in your markup hidden with css. So i didnt do this. Instead I created a flex item with a set height and flex-direction of column, along with information in the data object dictating the position that each element should be on mobile and desktop, respectively, using flex `order`.  

This fifty fifty block can handle various types of input. I tried to envision a client using a CMS trying to create content blocks. In the example given to me, I saw an image, some text, and a button - one that had been used previously. 

So, I set out to create a front-end component that could handle an editor creating a "block" - the fiftyfifty component - that contains various "sub-blocks" - image, wysiwyg that renders to html, and a button (could be any react component though).

The schema I came up with for the data is as follows - 

```
fiftyFifty: {
    desktopDirection: - a string that's either `row` or `column` depending on what the editor wants, 
    mobileDirection: - see above, but for mobile.,
    blocks: - an array of objects, each consisting of a block.
  } 

```

The individual blocks take the following shape -

```
{
        type: a string that dictates what component gets rendered,
        href: a string in the case of an image - the <img> needs a src value.,
        color: for the image background to match the design. Could also be good as a placeholder while the image loads,
        desktopPos: an int dictating the position of the block on desktop,
        mobilePos: an int dictating the position of the block on mobile,
        alignSelf: a string that allows for individual elements to break the pattern of the parent block. Useful in this case with the `Button` in particular which is bottom aligned.
      },
```

Back to the types - image, html, component - in the case of the Component, I had thought about just rendering the `Button` as html, but if I were to render the button using `dangerouslySetInnerHtml` on a div, then I would need to bring in all of the `Button` styles that were dictated in `Button.module.scss` into the `global.scss` file, which would get loaded on each page, regardless if there's a button on that page or not. Further, if there are ever any design changes to `Button.module.scss` those would have to get moved over into global.scss also, which would end up being completely unmaintainable, especially as multiple developers who don't know how everything works under the hood work on the project. 

So a solution to this is the BlockRender component, which I talk about next.

**BlockRender**

This is a component that takes props that are provided in `data.js` (and thus could be entered into a cms) and renders a component with those props based on the `name` of the component. Currently there's only functionality for `Button`, but hypothetically we could change `Button` to `Article` and if we provided accurate prop values in the `data.js` schema and added a switch case in the function BlockRender exports, we could also have an inline article here. This allows for a <Button> to always look like a button, and load the minimum amount of css in the bundle. 

## Communication

While working through this project, I had emailed Tim Henager to clarify an issue with the text being "transparent" in the body of the FiftyFifty block. He got back to me and told me it was intentional and asked me how I would handle this situation. This made me realize that this take home test was also trying to see how I would communicate with other people while working on projects. 

How I ask for things, in what sort of timely manner I do this in, etc. are all crucial parts of working in the development. 

I had received the email from Tim at 5 CST, and although I wanted to respond instantly, I was cognizant of the time, and my relation to Tim. For Tim, he is probably busy with other things and helping out a potential new hire with accessing fonts for a coding challenge is probably at the bottom of his priorities. Further, I thought it was the end of the day for him, and I didn't want to bother him with more emails at the end of the day.

However I should have considered that Tim is in Long Beach, meaning that it was 3PM for him, which is a reasonable time to send an email/ask for something. 

Instead I scheduled an email for 9AM CST the next day asking if there were mobile designs, font files, ui designs, etc. 

That's a lot of stuff, *and* again, he's on PST, so he got that email at 7AM. He may have woke up, checked his phone, seen the email, and gone back to sleep. When he woke up again, he may have gotten 3 other emails, pushing my email to the bottom of his priority queue, and I never got the files that would have helped me create a web page more accurate to the design.

## Summary
I feel great about the work I did on this! I think I definitely kinda went overkill on some stuff and made some things more complicated than they needed to be, but it was to show how I think about creating websites and I tried to emulate how I actually work. 

I could improve the project by getting the header in a better spot, and asking for assets sooner would have been good.

However I think the project looks good and the way the site handles the json from `data.js`  shows how I can create websites that are flexible and provide a lot of opportunities for clients to create content for their website without too much complication, but also not making the site feel too rigid.

## Installation Instructions

> Installing this boilerplate assumes you already have [NodeJS](https://nodejs.org/en/) and
> [npm](https://www.npmjs.com/) installed and configured on your machine.

Install all npm modules via:

    npm install
    
    # Or,
    # yarn install

Then simply run `npm start` or `npm run dev` to start developing!
