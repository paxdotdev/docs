# Why are we making Pax?

We're developing Pax as an answer to a question: 

What would an ideal tool for crafting user interfaces look like? 

<div style="text-align: center; font-style: italic; font-weight: 100;">
    <img style="width: 50%; border: 5px solid rgb(224,220,219);" src="./future-tool.png" />
    <br />
    <br />
</div>

After some reflection, we settled on three core properties for this aspirational tool:

1. Multi-modality
2. Accessibility
3. Extensibility

## Multi-modality

Building UIs today can be approached in at least three distinct ways: coding, visual editing, and, more recently, using natural language augmented by AI. An ideal tool will deftly navigate between these modes. Users ought to have the freedom to code, design visually, and incorporate AI enhancements as they see fit.

At the current moment in time, state of the art tools focus on either code (React, Vue.js, etc.) or visual building (Framer, Webflow, Squarespace) with AI being used to supplement rather than stand alone.

The difficulty with integrating code and visual building comes down to a deep-rooted mapping problem. Existing developer languages weren't built with visual building in mind. Specifically, for a visual builder to consistently interpret and modify arbitrary JSX — since Turing-complete code is blended with templates — it would face the complexity of the halting problem.

Our bet in building Pax is that the solution to this lies in the developer language rather than the visual builder (Read more about our [here](./reference-designability.md)). 

Pax alongside its future visual editor will enable coders, visual builders, and LLMs to seamlessly collaborate on any website or application. 

## Accessibility & Extensibility

An ideal UI tool should be universally user-friendly while retaining the versatility to craft nearly anything.

Right now, we have a choice between flexible developer-only languages and restrictive no-code visual builder. You either own the code you write or you get visual building. Funnily enough, the closest workflow to achieve both today is within Chrome Dev Tools. You can open up a piece of software you own in dev tools and visually tweak it. Unfortunately, tweaking is all you can do since CDT doesn't write back to code.

Pax aims to acheive both:

1) It supports native visual building.
2) It can attaches to any host language, thus supporting anything that language can do.
3) It's both free and open-source.

Our vision is that *anyone* can use Pax to easily put their ideas on-screen and improve them endlessly as their goals change. Read more about our goals [here](./intro-goals-prior-art.md).

Enough opining, [let's get started!](./start-creating-a-project.md)