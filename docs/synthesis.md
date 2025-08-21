# Audio Programming / Synthesis

The goal of this document is to give a super quick overview of some of these topics. Most of these topics deserve a much more in depth description, but that can be overwhelming at first. If you're familiar with audio programming you will find nothing new here. If you're new to it, I hope this can serve as a placeholder in your brain until you're ready to dive deeper.

## Oscillators

An oscillator is a thing that generates a tone at a certain frequency. It outputs a kind of wave that goes up and down between -1 and 1, like a `~`. One complete iteration of this wave pattern is called a cycle. Frequency is a measurement of how many cycles fit in a second. A higher sound means more cycles per second, and traveling through each cycle quicker.

### Phase

Phase describes where we are on the X axis of our waveform. To generate a sound we have to continuously move to the right on the X axis. The phase describes where we are, and the phase increment describes how much we are moving for each sample. A higher frequency means more cycles per second, so our phase increments become larger and we rush through our phase quicker.

### Shape

An oscillator can generate wave forms in different shapes. The `~` shape is called a sine wave, and sounds very "pure" (or boring). A triangle wave looks more like `/\/` and sounds a little more interesting. A square wave `|‾|_|` and a saw tooth `/|/|` can sound a little abrasive.

A sine wave only generates the frequency of the note that it's being played at. This is called the fundamental frequency. These other shapes though, generate harmonics. Additional frequencies on top of the fundamental. Harmonics are related to the fundamental, so the note being played is still recognizable, it just sounds "fuller", "brighter" or "harsher".

### Aliasing

When playing certain waveforms (like triangle or square waves) at high frequencies, you might hear unwanted sounds called aliasing artifacts. Computers can only represent sounds up to half the frequency of the sample rate (Nyquist theorem). If you try to generate sounds above that they get "mirrored" back. These mirrored sounds don't relate to the note being played, and can sound out of place and unwanted.

Normally we don't want to play notes so high that they're near this "Nyquist" frequency. The problem is the harmonics that some shapes generate. These can extend far beyond the fundamental frequency of a note.

PolyBLEP is a technique that can be used to create these waveforms safely, avoiding generating any harmonics that are too high for the computer to handle.

## Envelopes

An envelope changes a parameter over time. They are commonly used in combination with volume but can be used with any parameter, such as pitch or filter settings.

Envelopes come in different types:

- **Attack/Release** envelopes have two phases Attack and Release.
  - Attack describes how quickly we go from 0 to 100% (usually represented as 0.0 → 1.0).
  - Release describes the opposite, how long does it take for the note to fade out.
  - This is the type of envelope most commonly used in this project.
  - Normally between Attack and Release the value is kept at 100% while a note is held.
  - For our percussive sounds we usually go from Attack straight into Release instead.
- **ADSR** envelopes add two phases in between Attack and Release. These envelopes can build up to a peak and then hold at a configurable level. They are not currently used in this project but worth looking into. An example of why you would want this is a piano sound. There's an initial burst of sound as the hammer hits the string, while you hold the key the note keeps playing but at a lower level than what it started at, and finally it quickly dampens when you release the key.

### Note on Attack

It might seem like we want an instant attack for percussive sounds and only really want to configure a custom release/decay/fade out. Ugly artifacts can occur in digital audio when jumping from silence to a sound instantly. To smooth out this transition we use the shortest attack setting that we can get away with.

## Filters

Filters change the frequency content of sounds. They can make sounds brighter, darker, or emphasize specific frequencies.

### Low Pass Filter (LPF)

A low pass filter lets low frequencies through while gradually reducing higher frequencies above a cutoff point. This makes sounds darker. In this project, LPFs are often used with envelopes to create dynamic changes. For example, the bass drum starts bright and quickly darkens as the filter cutoff frequency drops.

#### Resonance

Some filters can add "resonance", emphasis of frequencies around the cutoff point. This can add character and re-introduce some of the brightness that was filtered out, or even over-compensate for a dramatic effect.

### High Pass Filter (HPF)

A high pass filter does the opposite, it lets high frequencies through while reducing lower frequencies. This makes sounds brighter and removes unwanted low frequencies. Hi-hats, for example, use high pass filters to focus on their characteristic bright sound.

### Notch Filter

A notch filter sharply reduces a narrow range of frequencies while leaving most other frequencies untouched. This can remove unwanted tones or change the character of a sound. The snare drum uses a notch filter to shape its tonal character.

## Wave Shaping

Wave shaping is an effect that distorts sounds. A waveshaper takes an input, applies a function to it, and outputs the result. The function determines what happens to the input. A common function is `tanh`. If you put in a sine wave, `tanh` will flatten its shape. Taken to the extreme, it can turn a sine wave `~` into a square wave `|‾|_|`.

This effect adds harmonics to the sound that weren't there before.

### Wave Folding

Besides `tanh` other functions can be used. One that is used in a few places in this project is the `sin` function. Instead of flattening, this will fold the wave. The peaks will start to point inward. Here's a crude example:

`⋅.˳˳˳.⋅ॱ˙˙˙ॱ⋅.` → `⋅.˳.˳.⋅ॱ˙ॱ˙ॱ⋅.`

## Types of Synthesis

A short intro to some of the methods used in this project.

### Frequency Modulation

Frequency modulation can be used to continuously adjust the frequency of one oscillator (carrier), using the output of another (modulator). This is used to create more interesting sounds efficiently. It is usually implemented by adjusting the phase of the carrier, causing us to step slightly faster or slightly slower depending on the output of the modulator at the given time.

Whole synthesizers are designed around this concept.

### Subtractive Synthesis

As mentioned, depending on the shape oscillators can output some pretty grating sounds. These sounds can be tamed with filters. Doing so is called subtractive synthesis. You start with one or a few oscillators outputting very rich sounds, and then you can darken them, lighten them, emphasize or cut frequencies.

Besides tones, subtractive synthesis can also be performed with noise as a source. This technique is used for the Bongos and Claves/Wood block sounds.

### Additive Synthesis

Harmonics are what make sounds interesting. The techniques described previously add harmonics efficiently, but you have less control over them. You can also generate these harmonics yourself, by using more oscillators. This is called additive synthesis. This can be very inefficient if you need to add a lot of harmonics.

For this project additive synthesis is usually combined with another technique. A small number of fixed frequencies are generated, and then mixed with white noise, or a pair of oscillators that apply frequency modulation to create the full sound.

### Other Forms

These are a few other techniques worthy of consideration. They are not yet used in this project, but definitely could be!

- **Karplus-Strong** is a technique that uses a delay line, a buffer that stores samples, and plays them back later, like an echo. Karplus-Strong uses feedback, meaning the output of the delay line is fed back into it. This is combined with very short delays to create a simple model of a string.
- **Modal Synthesis** Uses multiple filters to simulate how real objects vibrate. Each filter represents one of the natural frequencies of the object (like a drum or bell). This can create very realistic sounds, but is more complex than basic subtractive synthesis.
