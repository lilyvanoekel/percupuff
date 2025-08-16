# Percupuff

Percupuff is a drum synthesizer written in [Cmajor](https://cmajor.dev/) with a TypeScript/React user interface. It aims to create semi-realistic drum sounds using a wide variety of audio synthesis techniques, inspired by various articles (such as [this one](https://www.soundonsound.com/techniques/synthesizing-cowbells-claves)) and other sources.

Thanks to the Cmajor tooling, this project can be compiled as a plugin to run in a DAW[†](#glossary) (such as [Reaper](https://www.reaper.fm/)) as a [CLAP](https://cleveraudio.org/)[†](#glossary) or VST3[†](#glossary) plugin, as a standalone executable or as a WebAssembly[†](#glossary).

To control the synthesizer MIDI[†](#glossary) input is typically used. It can be played real time with a MIDI controller[†](#glossary), or through a sequencer[†](#glossary) in a DAW. Ideally at some point the web version will also be playable through PC keyboard, mouse, touch, etc. for a lower bar of entry and more fun.

This project aims to prioritize an "educational angle" over things like performance or ultra realistic sound. The hope is that it can serve as an introduction to this kind of "audio programming" and enable experimentation and collaboration.

## State of the Project

The project is currently not finished. Not all sounds and features have been implemented yet. Contributions are welcome (@TODO: contribution guidelines and the like).

## Demo / Web Version

To be added.

## Building and Running

The easiest way to get started is to use VSCode (or a similar IDE) with the [Cmajor Tools extension](https://marketplace.visualstudio.com/items?itemName=CmajorSoftware.cmajor-tools). Please see the [Cmajor Getting Started instructions](https://cmajor.dev/docs/GettingStarted).

### Prerequisites

- VSCode
- [Cmajor Tools extension](https://marketplace.visualstudio.com/items?itemName=CmajorSoftware.cmajor-tools)
- Node.js and npm

### Building the view

The view needs to be built before you can run the project or build/export it as a plugin or WebAssembly.

- `cd` into `view`
- Install dependencies `npm install`
- `npm run build`

This will create `view/dist` which will contain:

- The built view
- An `index.js` file that functions as the glue between the Cmajor code and the view.

### Running

In VSCode with the Cmajor Tools installed:

- Open `percupuff.cmajorpatch`
- Open the Command Palete:
  - Command+Shift+P (on Mac) or
  - Ctrl+Shift+P (on Windows/Linux)
- Select `Cmajor: Run patch`.

### Development

Cmajor makes this pretty easy and straight forward, but there are a few gotchas in this project to be aware of:

- The Cmajor[†](#glossary)/DSP[†](#glossary) code hot reloads:

  - While having `Cmajor: Run patch` open make changes to any cmajor file, save them and they will be applied right away.

- The TypeScript/React/View code does **NOT** currently hot reload:

  - It might be possible to develop the view independently with `npm run dev` as expected with vite, with hot reloading in the browser, but this does not work with `Cmajor: Run patch`.
  - In `percupuff.cmajorpatch` we refer to `view/dist/index.js` specifically.
  - You have to run `npm run build` in the `view` folder to apply the changes and see them in the `Cmajor: Run patch` pane.
  - This also applies to any other Cmajor related tooling such as `Cmajor: Export patch as...`. **Always build the view first.**

- Parameters are defined in `view/src/params.ts`:

  - This project uses a LOT of parameters.
  - To reduce duplicated work `view/src/params.ts` is considered the source of truth.
  - Parameters are also defined in `dsp/Params.cmajor`, do not manually edit them here.
  - Instead use `npm run build-params` from the `view` folder.
    - Currently you have to manually paste its output into `dsp/Params.cmajor`. This should be made easier at some point.

- Some parameters are grouped (skip this for now if it's confusing).

  - Some of the sound processors (the files under `dsp/drums`) can create multiple sounds.
  - Parameters such as level, panning and velocity currently apply to the whole group.
  - For examples please see:

    - `view/src/params.ts`, specifically the `paramToEndpointId` and `endpointIdToParams` functions.
    - `view/src/commands/ParamBuilder.ts` `getConsolidatedParams`

## Glossary

**Audio Plugin:**
Audio plugins are little programs that can run inside of a DAW or other creative music software. They can be things like synthesizers, sound effects, visualizers and others.

**Audio Programming:**
Audio programming usually refer to programming things like synthesizers, audio effects or other music related software. You usually work down at the individual sample level to generate or manipulate sound in real time.

**Cmajor:**
A modern programming language and framework designed specifically for audio programming and plugin development. Cmajor provides tools for creating audio plugins, standalone applications, and WebAssembly modules with a focus on real-time audio processing and cross-platform deployment.

**CLAP (CLever Audio Plugin):**
CLAP is a modern open-source standard for audio plugins.

**DAW (Digital Audio Workstation):**  
A software application for recording, editing, mixing, and producing audio files. DAWs provide a graphical interface for arranging audio and MIDI tracks, applying effects, and managing virtual instruments. Examples include Reaper, Bitwig, and FL Studio.

**DSP (Digital Signal Processing):**
Make or manipulate sound with numbers. In the context of this project it might refer to the code that's responsible for generating the drum sounds, listening to midi signals, determining which drum should sound when.

**MIDI (Musical Instrument Digital Interface):**
MIDI is a protocol that devices and software use to communicate "musical information". It describes things like which note to start/stop playing and how hard it was pressed or hit. MIDI enables real-time performance, automation, and the ability to record and edit musical data without storing actual audio.

**MIDI Controller:**
A hardware device (like a keyboard, drum pad, or knob panel) that sends MIDI data to control software instruments and effects.

**Sample:**
In real life audio is a continuous vibration. If you measure this vibration without a computer you get a kind of wave pattern with ups and downs. The computer can only work with specific numbers, so it has to measure this pattern a certain amount of times per second. Each individual measurement is called a sample.

**Sample Rate:**
The sample "measurements" per second. When recording, generating, processing or outputting sound we need to know how many samples should go in a second.

**Sequencer:**
A tool for programming and playing back musical patterns. They can be part of a DAW or stand-alone. You can use it to create drum beats, melodies, and other sequences that control synthesizers.

**VST3 (Virtual Studio Technology 3):**  
Another standard for audio plugins.

**WebAssembly (Wasm):**  
A binary instruction format for a stack-based virtual machine, enabling high-performance execution of code on web browsers and other platforms. WebAssembly allows audio plugins and other applications to run efficiently in web environments.

## Audio Programming / Synthesis

### Oscillators

#### Phase

#### Aliasing

### Envelopes

### Filters

### Interpolation

### Vectorization
