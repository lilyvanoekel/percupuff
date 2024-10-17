// Adapted from https://github.com/dmadison/LED-Segment-ASCII/blob/master/16-Segment/16-Segment-ASCII_HEX-NDP.txt

/*
 *  Project     Segmented LED Display - ASCII Library
 *  @author     David Madison
 *  @link       github.com/dmadison/Segmented-LED-Display-ASCII
 *  @license    MIT - Copyright (c) 2017 David Madison
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

export const sixteenSegmentASCII: number[] = [
  0x0000 /* (space) */, 0x000c /* ! */, 0x0204 /* " */, 0xaa3c /* # */,
  0xaabb /* $ */, 0xee99 /* % */, 0x9371 /* & */, 0x0200 /* ' */,
  0x1400 /* ( */, 0x4100 /* ) */, 0xff00 /* * */, 0xaa00 /* + */,
  0x4000 /* , */, 0x8800 /* - */, 0x1000 /* . */, 0x4400 /* / */,
  0x44ff /* 0 */, 0x040c /* 1 */, 0x8877 /* 2 */, 0x083f /* 3 */,
  0x888c /* 4 */, 0x90b3 /* 5 */, 0x88fb /* 6 */, 0x000f /* 7 */,
  0x88ff /* 8 */, 0x88bf /* 9 */, 0x2200 /* : */, 0x4200 /* ; */,
  0x9400 /* < */, 0x8830 /* = */, 0x4900 /* > */, 0x2807 /* ? */,
  0x0af7 /* @ */, 0x88cf /* A */, 0x2a3f /* B */, 0x00f3 /* C */,
  0x223f /* D */, 0x80f3 /* E */, 0x80c3 /* F */, 0x08fb /* G */,
  0x88cc /* H */, 0x2233 /* I */, 0x007c /* J */, 0x94c0 /* K */,
  0x00f0 /* L */, 0x05cc /* M */, 0x11cc /* N */, 0x00ff /* O */,
  0x88c7 /* P */, 0x10ff /* Q */, 0x98c7 /* R */, 0x88bb /* S */,
  0x2203 /* T */, 0x00fc /* U */, 0x44c0 /* V */, 0x50cc /* W */,
  0x5500 /* X */, 0x88bc /* Y */, 0x4433 /* Z */, 0x2212 /* [ */,
  0x1100 /* \ */, 0x2221 /* ] */, 0x5000 /* ^ */, 0x0030 /* _ */,
  0x0100 /* ` */, 0xa070 /* a */, 0xa0e0 /* b */, 0x8060 /* c */,
  0x281c /* d */, 0xc060 /* e */, 0xaa02 /* f */, 0xa2a1 /* g */,
  0xa0c0 /* h */, 0x2000 /* i */, 0x2260 /* j */, 0x3600 /* k */,
  0x00c0 /* l */, 0xa848 /* m */, 0xa040 /* n */, 0xa060 /* o */,
  0x82c1 /* p */, 0xa281 /* q */, 0x8040 /* r */, 0xa0a1 /* s */,
  0x80e0 /* t */, 0x2060 /* u */, 0x4040 /* v */, 0x5048 /* w */,
  0x5500 /* x */, 0x0a1c /* y */, 0xc020 /* z */, 0xa212 /* { */,
  0x2200 /* | */, 0x2a21 /* } */, 0xcc00 /* ~ */, 0x0000 /* (del) */,
];
