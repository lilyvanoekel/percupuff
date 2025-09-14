# Improving a Sound

Improving a sound focuses on two main areas:

- Updating the Cmajor code that generates the sound, so that it sounds "better" in some way.
- Improving user configurability of the sound through parameters.

## Making it Sound Better

The specific "improving a sound" ticket might have a hint about what can be improved in the sound. For example:

> depending on the speakers/headphones used its perceived loudness varies greatly.

This could be a starting point, but you might also have your own ideas on how to improve the sound.

Implementing the improved sound could look like tweaks to the original sound, bigger changes like a completely different synthesis method, or anything in between.

What makes a sound "better" is subjective, so it's hard to provide concrete guidance. This also adds some uncertainty around code review and whether changes will be accepted. When in doubt, creating a draft PR with samples of the new sound can be helpful to solicit feedback.

## Making it More Configurable

Each sound has standard set of parameters including `level`, `panning` and `velocity`. In addition to these standard parameters, custom ones for the given sound can be defined. These custom parameters can influence anything in the sound generating code that you want. Some examples are:

- Decay, how long it takes for the sound to fade out.
- Filter settings that influence how much high/low frequencies are being removed.
- Pitch for an oscillator.
- Overdrive to make a sound punchier.
- Volume or balance of individual components of the sound (for example, the sound of the stick hitting the instrument, and the high frequency hiss that follows).
- Etc.

The UI currently has space for 3 of these custom parameters.

Like any parameter these are defined in [params.ts](https://github.com/lilyvanoekel/percupuff/blob/main/view/src/params.ts) (look for a comment on `custom parameters`).

### Updating Parameters

- Update `params.ts` as noted above.
- Under the view run `npm run build-params`.
  - This will output Cmajor code.
  - Copy or stream this output to `dsp/Params.cmajor`.
  - Do a git diff on `dsp/Params.cmajor` (`git diff ../dsp/Params.cmajor` if you're in the view folder) and you should see your new parameters added (and ideally no other changes).
- Build the view `npm run build` from within the view folder.
- You can now access your new parameters in the `event paramsIn(Params p)` block of your instrument, example:

```
event paramsIn(Params p) {
    // Standard params
    midiNotePitch = int(p.kick1Midi);
    outputLevel = p.kick1Level * 0.01f;
    panning = p.kick1Panning;

    // Custom params
    decay = p.kick1Decay;
}
```
