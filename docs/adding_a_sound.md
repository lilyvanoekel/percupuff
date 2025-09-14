# Adding a Sound

This is a rough guide explains how to add a new drum sound to Percupuff.

## Practical Overview

- If the instrument you are adding does not exist in the UI yet, add it here `view/src/params.ts`.
  - Adding a new instrument might break the UI layout. To decouple the task of adding an instrument from having to update the UI as well, you can add it with a `null` group first. For example `sideStick: { name: "Side Stick", group: null, midi: 37 },`.
    - For testing while working on it, put it in one of the existing groups. Then set it to `null` when creating a PR.
    - You might have to temporarily disable (set their group to `null`) one of the other sounds if the UI falls below the bottom threshold.
  - Percupuff defines standard parameters for every sound (`level`, `panning`, `velocity`, `midi` (the midi note key it triggers on by default)). For the view, these parameters are automatically defined just by adding an instrument to `view/src/params.ts`. For the Cmajor side, we need to follow this process:
    - Under the view run `npm run build-params`.
    - This will output Cmajor code.
    - Copy or stream this output to `dsp/Params.cmajor`.
    - Do a git diff on `dsp/Params.cmajor` (`git diff ../dsp/Params.cmajor` if you're in the view folder) and you should see parameters added for your new sound.
  - Build the view `npm run build` from within the view folder.
- Add a new `.cmajor` file under `dsp/drums` for your sound (or group of sounds).
  - Please refer to the template below to get started.
- Link your new `.cmajor` file in the main `percupuff.cmajorpatch` file.
- Link your new sound under `dsp/Percupuff.cmajor`.
  - The exact procedure might change over time, but likely you'll want to create a node for it.
    - `sideStick = Drums::SideStick;`
  - You'll need to feed parameters into it `p.paramsOut -> sideStick.paramsIn;`.
  - Send midi events into it `mpe -> sideStick.eventIn;`.
  - You might want to feed noise into it `noise -> claves.noiseIn;`.
  - Handle the output of your instrument `sideStick -> gainLimiter;`.
- Test your new sound.
  - Make sure your sound is (at least temporarily) added to a group in the UI (does not have a `null` value for group).
  - Make sure the view has been built with your most recent changes.
  - Run your patch by opening the command palette (`cmd-shft-p`) and selecting `Cmajor: Run patch`.
  - Select your sound in the UI.
  - Press the little red record button under `Midi Assignment`.
  - Click twice on the same note on the keyboard.
    - The first click should update the Midi Assignment to the midi note that corresponds to the one you pressed on the keyboard.
    - The second click should play your sound.

## Sound Template

This is a template to help get started adding a new sound. It's simplified from the Cowbell sound (at time of writing), with `osc1.frequencyModIn <- gain * 0.1f;` added to create a pew pew sound. It's called `SideStick` because that's what I'm using a test case for writing this document. Replace all mentions of `SideStick` with the name of your new sound.

If the ticket you picked up describes a group of sounds rather than a single one `dsp/drums/Claves.cmajor` is probably the easiest to get started from.

```
namespace Percupuff
{
    namespace Drums
    {
        processor SideStick {
            input event (std::notes::NoteOn) eventIn;
            output stream float<2> out;
            input event Params paramsIn;

            float triggerVelocity = 0.0f;
            int midiNotePitch = 0;
            float outputLevel = 0.5f;
            float panning = 0.0f;

            // Velocity sensitivity is not implemented yet
            float velocitySensitivity = 1.0f;

            event paramsIn(Params p) {
                midiNotePitch = int(p.sideStickMidi);
                outputLevel = p.sideStickLevel * 0.01f;
                panning = p.sideStickPanning;
                velocitySensitivity = p.sideStickVelocity;
            }

            event eventIn(std::notes::NoteOn n) {
                if (int (n.pitch) == midiNotePitch) {
                    triggerVelocity = sqrt(n.velocity);
                }
            }

            node envelope = Envelope;
            node osc1 = Oscillator(OscillatorShape::triangle);

            void main()
            {
                envelope.attackIn <- .001f;
                osc1.frequencyIn <- 587.0f;

                loop
                {
                    while (triggerVelocity == 0) {
                        advance();
                    }

                    let vel = triggerVelocity;
                    triggerVelocity = 0.0f;

                    envelope.releaseIn <- .2f + vel * 0.4f;
                    envelope.triggerIn <- void;
                    envelope.advance();
                    float gain = envelope.gainOut;
                    while (gain > 0.0f && triggerVelocity == 0.0f) {
                        osc1.frequencyModIn <- gain * 0.1f;
                        let outSample = osc1.out * gain * vel * outputLevel;

                        float pan = panning * 0.01f;
                        float leftGain  = 0.5f * (1.0f - pan);
                        float rightGain = 0.5f * (1.0f + pan);
                        out <- (outSample * leftGain, outSample * rightGain);

                        osc1.advance();

                        gain = envelope.gainOut;
                        envelope.advance();
                        advance();
                    }
                }
            }
        }
    }
}
```

## What is DSP

Please see the [glossary](https://github.com/lilyvanoekel/percupuff/blob/main/docs/glossary.md#dsp-digital-signal-processing).
