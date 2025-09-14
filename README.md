# Percupuff

Percupuff is a drum synthesizer[†](docs/glossary.md#synthesizer) written in [Cmajor](https://cmajor.dev/) with a TypeScript/React user interface. It aims to create semi-realistic drum sounds using a wide variety of audio synthesis[†](docs/glossary.md#audio-synthesis) techniques, inspired by various articles (such as [this one](https://www.soundonsound.com/techniques/synthesizing-cowbells-claves)) and other sources.

Thanks to the Cmajor tooling, this project can be compiled as a plugin[†](docs/glossary.md#audio-plugin) to run in a DAW[†](docs/glossary.md#daw) (such as [Reaper](https://www.reaper.fm/)) as a [CLAP](https://cleveraudio.org/)[†](docs/glossary.md#clap) or VST3[†](docs/glossary.md#vst3) plugin, as a standalone executable or as a WebAssembly[†](docs/glossary.md#webassembly).

To control the synthesizer MIDI[†](docs/glossary.md#midi) input is typically used. It can be played real time with a MIDI controller[†](docs/glossary.md#midi-controller), or through a sequencer[†](docs/glossary.md#sequencer) in a DAW. Ideally at some point the web version will also be playable through PC keyboard, mouse, touch, etc. for a lower bar of entry and more fun.

This project aims to prioritize an "educational angle" over things like performance or ultra realistic sound. The hope is that it can serve as an introduction to this kind of "audio programming" and enable experimentation and collaboration.

![Percupuff UI Screenshot](docs/assets/screenshot.png)

## So what is it?

Percupuff is a drum machine that creates drum sounds by building them from scratch using math and code. It can run on the web, as a standalone program, or as a plugin in your music software. Each drum sound is created using different techniques, making it great for learning how digital audio works or just making quirky drum sounds for your music.

## Why would I want this?

- You produce music on the computer and want some new quirky drum sounds.
- You want to learn about audio programming and do some experiments. Play around with existing sounds or design your own.
- You want to connect a Drumpad or Keyboard and play in real time.

## State of the Project

The project is currently not finished. Not all sounds and features have been implemented yet. Contributions are welcome. Please have a look at:

- The [Code of Conduct](https://github.com/lilyvanoekel/percupuff/blob/main/CODE_OF_CONDUCT.md)
- [Contributing to Percupuff](https://github.com/lilyvanoekel/percupuff/blob/main/CONTRIBUTING.md)
- The [Issue List](https://github.com/lilyvanoekel/percupuff/issues)

These resources could also be helpful:

- [Glossary](https://github.com/lilyvanoekel/percupuff/blob/main/docs/glossary.md)
- [Audio Programming / Synthesis guide](https://github.com/lilyvanoekel/percupuff/blob/main/docs/synthesis.md)
- [Adding a Sound](https://github.com/lilyvanoekel/percupuff/blob/main/docs/adding_a_sound.md)
- [Improving a Sound](https://github.com/lilyvanoekel/percupuff/blob/main/docs/improving_a_sound.md)

If anything is still unclear after that, please feel free to [create a question issue](https://github.com/lilyvanoekel/percupuff/issues/new?template=question.yml).

## Demo / Web Version

[Try it!](https://lilyvanoekel.github.io/percupuff/demo/index.html)

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
- Open the Command Palette:
  - Command+Shift+P (on Mac) or
  - Ctrl+Shift+P (on Windows/Linux)
- Select `Cmajor: Run patch`.

### Development

Cmajor makes this pretty easy and straightforward, but there are a few gotchas in this project to be aware of:

- The Cmajor[†](docs/glossary.md#cmajor)/DSP[†](docs/glossary.md#dsp) code hot reloads:

  - While having `Cmajor: Run patch` open make changes to any cmajor file, save them and they will be applied right away.

- The TypeScript/React/View code does **NOT** currently hot reload:

  - It might be possible to develop the view independently with `npm run dev` as expected with vite, with hot reloading in the browser, but this does not work with `Cmajor: Run patch`.
  - In `percupuff.cmajorpatch` we refer to `view/dist/index.js` specifically.
  - You have to run `npm run build` in the `view` folder to apply the changes and see them in the `Cmajor: Run patch` pane.
  - This also applies to any other Cmajor related tooling such as `Cmajor: Export patch as...`. **Always build the view first.**

- Parameters[†](docs/glossary.md#parameters) are defined in `view/src/params.ts`:

  - This project uses a LOT of parameters.
  - To reduce duplicated work `view/src/params.ts` is considered the source of truth.
  - Parameters are also defined in `dsp/Params.cmajor`, do not manually edit them here.
  - Instead use `npm run build-params` from the `view` folder.
    - Currently you have to manually paste its output into `dsp/Params.cmajor`. This should be made easier at some point.

- Some parameters are grouped (skip this for now if it's confusing).

  - Some of the sound processors[†](docs/glossary.md#processors) (the files under `dsp/drums`) can create multiple sounds.
  - Parameters such as level[†](docs/glossary.md#level), panning[†](docs/glossary.md#panning) and velocity[†](docs/glossary.md#velocity) currently apply to the whole group.
  - For examples please see:

    - `view/src/params.ts`, specifically the `paramToEndpointId` and `endpointIdToParams` functions.
    - `view/src/commands/ParamBuilder.ts` `getConsolidatedParams`

### Building a CLAP plugin

**Prerequisites:**

- Cmajor extension in VSCode (or Cursor)
- The view has been built with the most recent changes (see [Building the view](#building-the-view))
- CMake
- macOS (these instructions are macOS-specific)

**Steps:**

1. Export the patch as a CLAP plugin:

   - Open Command Palette: `Cmd+Shift+P`
   - Select `"Cmajor: Export patch as a CLAP plugin"`

2. Download the CLAP SDK:

   - Download from: https://github.com/free-audio/clap
   - Extract and store the CLAP SDK somewhere on your system

3. Build the plugin:

   ```bash
   cd /path/to/exported/plugin/folder
   cmake -B build -DCLAP_INCLUDE_PATH="/path/to/clap/include" -DCMAKE_BUILD_TYPE=Release
   cmake --build build --config Release
   ```

4. Install the plugin:
   ```bash
   cp -r ./Percupuff.clap /Library/Audio/Plug-Ins/CLAP
   ```

## General MIDI Percussion Key Map

General MIDI[†](docs/glossary.md#general-midi) defines a standard for percussive sounds that assigns specific notes to specific percussive instruments. In MIDI each note has a number. 60, for example, represents a C note at a certain octave. The percussion map defines which note numbers trigger which drum sounds, so instead of playing a tone, you get a specific percussion instrument.

This project attempts to follow this standard. Below is a table showing the state of what is implemented so far. Some instruments exist in the UI, but have no actual implementation yet.

Contributions for instruments that are not yet included in the UI are definitely welcome. They do come with the added complexity of needing to rejiggle the UI, but that does not necessarily have to be done in the same PR.

| Note | Instrument         | Included in UI | Implemented | Source File                                  |
| ---- | ------------------ | -------------- | ----------- | -------------------------------------------- |
| 35   | Acoustic Bass Drum | ✅             | ✅          | [BassDrum.cmajor](dsp/drums/BassDrum.cmajor) |
| 36   | Electric Bass Drum | ✅             | ❌          | -                                            |
| 37   | Side Stick         | ❌             | ❌          | -                                            |
| 38   | Acoustic Snare     | ✅             | ✅          | [Snare.cmajor](dsp/drums/Snare.cmajor)       |
| 39   | Hand Clap          | ✅             | ✅          | [Clap.cmajor](dsp/drums/Clap.cmajor)         |
| 40   | Electric Snare     | ✅             | ❌          | -                                            |
| 41   | Low Floor Tom      | ✅             | ❌          | -                                            |
| 42   | Closed Hi-hat      | ✅             | ✅          | [Hihat.cmajor](dsp/drums/Hihat.cmajor)       |
| 43   | High Floor Tom     | ✅             | ❌          | -                                            |
| 44   | Pedal Hi-hat       | ✅             | ✅          | [Hihat.cmajor](dsp/drums/Hihat.cmajor)       |
| 45   | Low Tom            | ✅             | ❌          | -                                            |
| 46   | Open Hi-hat        | ✅             | ✅          | [Hihat.cmajor](dsp/drums/Hihat.cmajor)       |
| 47   | Low-Mid Tom        | ✅             | ❌          | -                                            |
| 48   | High-Mid Tom       | ✅             | ❌          | -                                            |
| 49   | Crash Cymbal 1     | ✅             | ✅          | [Crash.cmajor](dsp/drums/Crash.cmajor)       |
| 50   | High Tom           | ✅             | ❌          | -                                            |
| 51   | Ride Cymbal 1      | ❌             | ❌          | -                                            |
| 52   | Chinese Cymbal     | ✅             | ✅          | [Crash.cmajor](dsp/drums/Crash.cmajor)       |
| 53   | Ride Bell          | ❌             | ❌          | -                                            |
| 54   | Tambourine         | ❌             | ❌          | -                                            |
| 55   | Splash Cymbal      | ❌             | ❌          | -                                            |
| 56   | Cowbell            | ✅             | ✅          | [Cowbell.cmajor](dsp/drums/Cowbell.cmajor)   |
| 57   | Crash Cymbal 2     | ✅             | ✅          | [Crash.cmajor](dsp/drums/Crash.cmajor)       |
| 58   | Vibraslap          | ❌             | ❌          | -                                            |
| 59   | Ride Cymbal 2      | ❌             | ❌          | -                                            |
| 60   | High Bongo         | ✅             | ✅          | [Bongos.cmajor](dsp/drums/Bongos.cmajor)     |
| 61   | Low Bongo          | ✅             | ✅          | [Bongos.cmajor](dsp/drums/Bongos.cmajor)     |
| 62   | Mute High Conga    | ❌             | ❌          | -                                            |
| 63   | Open High Conga    | ❌             | ❌          | -                                            |
| 64   | Low Conga          | ❌             | ❌          | -                                            |
| 65   | High Timbale       | ❌             | ❌          | -                                            |
| 66   | Low Timbale        | ❌             | ❌          | -                                            |
| 67   | High Agogô         | ❌             | ❌          | -                                            |
| 68   | Low Agogô          | ❌             | ❌          | -                                            |
| 69   | Cabasa             | ❌             | ❌          | -                                            |
| 70   | Maracas            | ❌             | ❌          | -                                            |
| 71   | Short Whistle      | ❌             | ❌          | -                                            |
| 72   | Long Whistle       | ❌             | ❌          | -                                            |
| 73   | Short Güiro        | ❌             | ❌          | -                                            |
| 74   | Long Güiro         | ❌             | ❌          | -                                            |
| 75   | Claves             | ✅             | ✅          | [Claves.cmajor](dsp/drums/Claves.cmajor)     |
| 76   | High Woodblock     | ✅             | ✅          | [Claves.cmajor](dsp/drums/Claves.cmajor)     |
| 77   | Low Woodblock      | ✅             | ✅          | [Claves.cmajor](dsp/drums/Claves.cmajor)     |
| 78   | Mute Cuíca         | ❌             | ❌          | -                                            |
| 79   | Open Cuíca         | ❌             | ❌          | -                                            |
| 80   | Mute Triangle      | ❌             | ❌          | -                                            |
| 81   | Open Triangle      | ❌             | ❌          | -                                            |

## Audio Programming / Synthesis

For more details on the audio programming and audio synthesis concepts used in this project, see [Audio Programming / Synthesis](docs/synthesis.md).

## Contributing

Contributions are welcome! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## Code of Conduct

This project follows a [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming environment for all contributors.

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](LICENSE) file for details.
