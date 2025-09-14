# Glossary

## Audio Plugin

Audio plugins are little programs that can run inside of a DAW or other creative music software. They can be things like synthesizers, sound effects, visualizers and others.

## Audio Programming

Audio programming usually refers to programming things like synthesizers, audio effects or other music related software. You usually work down at the individual sample level to generate or manipulate sound in real time.

## Audio Synthesis

Creating sounds using code or electronics, usually with the goal of producing something musical (in the widest sense of the word).

## Cmajor

A modern programming language and framework designed specifically for audio programming and plugin development. Cmajor provides tools for creating audio plugins, standalone applications, and WebAssembly modules with a focus on real-time audio processing and cross-platform deployment.

## CLAP (CLever Audio Plugin)

CLAP is a modern open-source standard for audio plugins.

## DAW (Digital Audio Workstation)

A software application for recording, editing, mixing, and producing audio files. DAWs provide a graphical interface for arranging audio and MIDI tracks, applying effects, and managing virtual instruments. Examples include Reaper, Bitwig, and FL Studio.

## DSP (Digital Signal Processing)

Make or manipulate sound with numbers. In the context of this project it might refer to the code that's responsible for generating the drum sounds, listening to MIDI signals, determining which drum should sound when. This project has two main "domains":

- The view, a TypeScript/React based app that controls the UI/UX.
- DSP code written in Cmajor that consumes MIDI messages and creates the sounds.

## General MIDI

A standard that ensures MIDI data triggers predictable instruments on different devices by defining which MIDI messages correspond to which instruments and parameters.

## Graphs

Processors and Graphs are building blocks of Cmajor. For more details, see the [Cmajor documentation](https://cmajor.dev/docs/GettingStarted#processors-and-graphs).

## Level

How loud a sound is (also called volume or gain). This can apply to individual drum sounds or the overall mix.

## MIDI (Musical Instrument Digital Interface)

MIDI is a protocol that devices and software use to communicate "musical information". It describes things like which note to start/stop playing and how hard it was pressed or hit. MIDI enables real-time performance, automation, and the ability to record and edit musical data without storing actual audio.

## MIDI Controller

A hardware device (like a keyboard, drum pad, or knob panel) that sends MIDI data to control software instruments and effects.

## Sample

In real life audio is a continuous vibration. If you measure this vibration without a computer you get a kind of wave pattern with ups and downs. The computer can only work with specific numbers, so it has to measure this pattern a certain amount of times per second. Each individual measurement is called a sample.

## Sample Rate

The sample "measurements" per second. When recording, generating, processing or outputting sound we need to know how many samples should go in a second.

## Parameters

In the context of this project parameters have a very specific meaning. Percupuff has two distinct types of input; MIDI triggers drum sounds while parameters control their settings. Parameters are user controlled settings that can affect things like:

- How loud the bass drum should be
- Whether the snare drum should be a little louder on the left than the right
- Which key should trigger the cowbell
- Etc.

Because each sound has its own set of parameters, the total number of parameters in this project is quite large.

## Panning

Controls whether you hear a sound in your left or right ear, or somewhere in between.

## Processors

Processors and Graphs are building blocks of Cmajor. For more details, see the [Cmajor documentation](https://cmajor.dev/docs/GettingStarted#processors-and-graphs).

## Sequencer

A tool for programming and playing back musical patterns. They can be part of a DAW or stand-alone. You can use it to create drum beats, melodies, and other sequences that control synthesizers.

## Synthesizer

A musical instrument or computer program that creates sounds by generating audio signals. You can use different techniques to make all kinds of sounds. They can sound like real instruments or create completely new sounds that don't exist in nature.

## VST3 (Virtual Studio Technology 3)

Another standard for audio plugins.

## Velocity

How hard a note was hit on the keyboard or drum pad. Usually you want the sound to be louder when the note was hit harder. This can also be used to control other characteristics, for example making a hard hit sound brighter as well.

## WebAssembly (Wasm)

A binary instruction format for a stack-based virtual machine, enabling high-performance execution of code on web browsers and other platforms. WebAssembly allows audio plugins and other applications to run efficiently in web environments.
