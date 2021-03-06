/* -----------------------------------------------------------------------------
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
----------------------------------------------------------------------------- */

package fuzztest._dev_concepts.math.rnd;

import static jsweet.dom.Globals.console;

import fuzztest.utils.gen.TRndMT;

/**
 * @author peter
 *
 * Output (excerpt):
 * 
 * 2016-11-15 07:47:53.339 bundle.js:230 =========================================================
 * 2016-11-15 07:47:53.344 bundle.js:231 TDevRnd_01
 * 2016-11-15 07:47:53.345 bundle.js:232 =========================================================
 * 2016-11-15 07:47:53.345 bundle.js:233 GetDouble
 * 2016-11-15 07:47:53.346 bundle.js:234 ------------------------------------------
 * 2016-11-15 07:47:53.348 bundle.js:237 0.548813502304256
 * 2016-11-15 07:47:53.348 bundle.js:237 0.5928446163889021
 * 2016-11-15 07:47:53.349 bundle.js:237 0.715189364971593
 * 2016-11-15 07:47:53.349 bundle.js:237 0.8442657440900803
 * 2016-11-15 07:47:53.349 bundle.js:237 0.6027633703779429
 * 2016-11-15 07:47:53.350 bundle.js:237 0.8579456198494881
 * 2016-11-15 07:47:53.350 bundle.js:237 0.5448831773828715
 * 2016-11-15 07:47:53.350 bundle.js:237 0.8472517372574657
 * 2016-11-15 07:47:53.351 bundle.js:237 0.42365479678846896
 * 2016-11-15 07:47:53.351 bundle.js:237 0.6235636963974684
 * 2016-11-15 07:47:53.352 bundle.js:237 0.6458941150922328
 * 2016-11-15 07:47:53.352 bundle.js:237 0.3843817082233727
 * 2016-11-15 07:47:53.352 bundle.js:237 0.43758720997720957
 * 2016-11-15 07:47:53.353 bundle.js:237 0.29753460525535047
 * 2016-11-15 07:47:53.353 bundle.js:237 0.8917730017565191
 * 2016-11-15 07:47:53.353 bundle.js:237 0.05671297572553158
 * 2016-11-15 07:47:53.354 bundle.js:237 0.963662764057517
 * 2016-11-15 07:47:53.354 bundle.js:237 0.27265629451721907
 * 2016-11-15 07:47:53.354 bundle.js:237 0.38344152132049203
 * 2016-11-15 07:47:53.355 bundle.js:237 0.4776651116553694
 * 2016-11-15 07:47:53.355 bundle.js:237 0.79172503342852
 * 2016-11-15 07:47:53.355 bundle.js:237 0.8121687264647335
 * 2016-11-15 07:47:53.355 bundle.js:237 0.5288949215319008
 * 2016-11-15 07:47:53.356 bundle.js:237 0.4799771714024246
 * 2016-11-15 07:47:53.356 bundle.js:237 0.568044563755393
 * 2016-11-15 07:47:53.356 bundle.js:237 0.3927847931627184
 * 2016-11-15 07:47:53.357 bundle.js:237 0.925596633227542
 * 2016-11-15 07:47:53.357 bundle.js:237 0.8360787688288838
 * 2016-11-15 07:47:53.357 bundle.js:237 0.07103605871088803
 * 2016-11-15 07:47:53.358 bundle.js:237 0.3373961616307497
 * 2016-11-15 07:47:53.358 bundle.js:237 0.08712929696775973
 * 2016-11-15 07:47:53.358 bundle.js:237 0.6481718765571713
 * 2016-11-15 07:47:53.358 bundle.js:237 0.020218399120494723
 * 2016-11-15 07:47:53.359 bundle.js:237 0.3682415373623371
 * 2016-11-15 07:47:53.359 bundle.js:237 0.8326198428403586
 * 2016-11-15 07:47:53.360 bundle.js:237 0.9571551543194801
 * 2016-11-15 07:47:53.360 bundle.js:237 0.778156756889075
 * 2016-11-15 07:47:53.360 bundle.js:237 0.14035077742300928
 * 2016-11-15 07:47:53.361 bundle.js:237 0.8700121452566236
 * 2016-11-15 07:47:53.361 bundle.js:237 0.8700872510671616
 * 2016-11-15 07:47:53.361 bundle.js:239 ------------------------------------------
 * 2016-11-15 07:47:53.361 bundle.js:240 GetIntBetween (2, 4)
 * 2016-11-15 07:47:53.362 bundle.js:241 ------------------------------------------
 * 2016-11-15 07:47:53.362 bundle.js:244 4
 * 2016-11-15 07:47:53.363 bundle.js:244 3
 * 2016-11-15 07:47:53.363 bundle.js:244 4
 * 2016-11-15 07:47:53.366 bundle.js:244 4
 * 2016-11-15 07:47:53.367 bundle.js:244 3
 * 2016-11-15 07:47:53.367 bundle.js:244 3
 * 2016-11-15 07:47:53.367 bundle.js:244 4
 * 2016-11-15 07:47:53.367 bundle.js:244 4
 * 2016-11-15 07:47:53.368 bundle.js:244 2
 * 2016-11-15 07:47:53.368 bundle.js:244 4
 * 2016-11-15 07:47:53.369 bundle.js:244 3
 * 2016-11-15 07:47:53.369 bundle.js:244 3
 * 2016-11-15 07:47:53.369 bundle.js:244 2
 * 2016-11-15 07:47:53.369 bundle.js:244 3
 * 2016-11-15 07:47:53.370 bundle.js:244 4
 * 2016-11-15 07:47:53.370 bundle.js:244 4
 * 2016-11-15 07:47:53.372 bundle.js:244 3
 * 2016-11-15 07:47:53.373 bundle.js:244 2
 * 2016-11-15 07:47:53.373 bundle.js:244 3
 * 2016-11-15 07:47:53.373 bundle.js:244 3
 * 2016-11-15 07:47:53.374 bundle.js:244 2
 * 2016-11-15 07:47:53.374 bundle.js:244 2
 * 2016-11-15 07:47:53.374 bundle.js:244 4
 * 2016-11-15 07:47:53.375 bundle.js:244 4
 * 2016-11-15 07:47:53.375 bundle.js:244 3
 * 2016-11-15 07:47:53.376 bundle.js:244 2
 * 2016-11-15 07:47:53.379 bundle.js:244 3
 * 2016-11-15 07:47:53.380 bundle.js:244 2
 * 2016-11-15 07:47:53.381 bundle.js:244 2
 * 2016-11-15 07:47:53.381 bundle.js:244 2
 * 2016-11-15 07:47:53.381 bundle.js:244 3
 * 2016-11-15 07:47:53.382 bundle.js:244 2
 * 2016-11-15 07:47:53.383 bundle.js:244 3
 * 2016-11-15 07:47:53.383 bundle.js:244 2
 * 2016-11-15 07:47:53.384 bundle.js:244 3
 * 2016-11-15 07:47:53.384 bundle.js:244 3
 * 2016-11-15 07:47:53.384 bundle.js:244 4
 * 2016-11-15 07:47:53.385 bundle.js:244 4
 * 2016-11-15 07:47:53.385 bundle.js:244 4
 * 2016-11-15 07:47:53.385 bundle.js:244 3
 * 2016-11-15 07:47:53.386 bundle.js:246 ------------------------------------------
 * 2016-11-15 07:47:53.386 bundle.js:247 GetIntBetween (-1, 1)
 * 2016-11-15 07:47:53.386 bundle.js:248 ------------------------------------------
 * 2016-11-15 07:47:53.387 bundle.js:251 0
 * 2016-11-15 07:47:53.387 bundle.js:251 0
 * 2016-11-15 07:47:53.387 bundle.js:251 0
 * 2016-11-15 07:47:53.388 bundle.js:251 1
 * 2016-11-15 07:47:53.388 bundle.js:251 1
 * 2016-11-15 07:47:53.388 bundle.js:251 -1
 * 2016-11-15 07:47:53.388 bundle.js:251 -1
 * 2016-11-15 07:47:53.389 bundle.js:251 1
 * 2016-11-15 07:47:53.389 bundle.js:251 1
 * 2016-11-15 07:47:53.389 bundle.js:251 0
 * 2016-11-15 07:47:53.390 bundle.js:251 1
 * 2016-11-15 07:47:53.390 bundle.js:251 -1
 * 2016-11-15 07:47:53.390 bundle.js:251 -1
 * 2016-11-15 07:47:53.391 bundle.js:251 0
 * 2016-11-15 07:47:53.391 bundle.js:251 -1
 * 2016-11-15 07:47:53.391 bundle.js:251 1
 * 2016-11-15 07:47:53.392 bundle.js:251 -1
 * 2016-11-15 07:47:53.392 bundle.js:251 0
 * 2016-11-15 07:47:53.392 bundle.js:251 0
 * 2016-11-15 07:47:53.392 bundle.js:251 -1
 * 2016-11-15 07:47:53.393 bundle.js:251 0
 * 2016-11-15 07:47:53.393 bundle.js:251 -1
 * 2016-11-15 07:47:53.394 bundle.js:251 0
 * 2016-11-15 07:47:53.394 bundle.js:251 0
 * 2016-11-15 07:47:53.394 bundle.js:251 1
 * 2016-11-15 07:47:53.395 bundle.js:251 1
 * 2016-11-15 07:47:53.395 bundle.js:251 -1
 * 2016-11-15 07:47:53.395 bundle.js:251 0
 * 2016-11-15 07:47:53.396 bundle.js:251 -1
 * 2016-11-15 07:47:53.396 bundle.js:251 0
 * 2016-11-15 07:47:53.396 bundle.js:251 -1
 * 2016-11-15 07:47:53.396 bundle.js:251 1
 * 2016-11-15 07:47:53.397 bundle.js:251 0
 * 2016-11-15 07:47:53.397 bundle.js:251 0
 * 2016-11-15 07:47:53.397 bundle.js:251 -1
 * 2016-11-15 07:47:53.398 bundle.js:251 0
 * 2016-11-15 07:47:53.398 bundle.js:251 0
 * 2016-11-15 07:47:53.398 bundle.js:251 0
 * 2016-11-15 07:47:53.399 bundle.js:251 -1
 * 2016-11-15 07:47:53.399 bundle.js:251 0
 * 2016-11-15 07:47:53.399 bundle.js:253 ------------------------------------------
 * 2016-11-15 07:47:53.401 bundle.js:254 GetBoolean ()
 * 2016-11-15 07:47:53.402 bundle.js:255 ------------------------------------------
 * 2016-11-15 07:47:53.402 bundle.js:258 false
 * 2016-11-15 07:47:53.402 bundle.js:258 false
 * 2016-11-15 07:47:53.403 bundle.js:258 false
 * 2016-11-15 07:47:53.403 bundle.js:258 true
 * 2016-11-15 07:47:53.404 bundle.js:258 true
 * 2016-11-15 07:47:53.404 bundle.js:258 false
 * 2016-11-15 07:47:53.404 bundle.js:258 false
 * 2016-11-15 07:47:53.405 bundle.js:258 true
 * 2016-11-15 07:47:53.405 bundle.js:258 false
 * 2016-11-15 07:47:53.405 bundle.js:258 true
 * 2016-11-15 07:47:53.406 bundle.js:258 false
 * 2016-11-15 07:47:53.406 bundle.js:258 true
 * 2016-11-15 07:47:53.406 bundle.js:258 true
 * 2016-11-15 07:47:53.406 bundle.js:258 false
 * 2016-11-15 07:47:53.407 bundle.js:258 false
 * 2016-11-15 07:47:53.407 bundle.js:258 true
 * 2016-11-15 07:47:53.407 bundle.js:258 true
 * 2016-11-15 07:47:53.408 bundle.js:258 true
 * 2016-11-15 07:47:53.408 bundle.js:258 false
 * 2016-11-15 07:47:53.409 bundle.js:258 true
 * 2016-11-15 07:47:53.409 bundle.js:258 true
 * 2016-11-15 07:47:53.410 bundle.js:258 true
 * 2016-11-15 07:47:53.410 bundle.js:258 false
 * 2016-11-15 07:47:53.410 bundle.js:258 true
 * 2016-11-15 07:47:53.411 bundle.js:258 true
 * 2016-11-15 07:47:53.411 bundle.js:258 false
 * 2016-11-15 07:47:53.418 bundle.js:258 true
 * 2016-11-15 07:47:53.418 bundle.js:258 false
 * 2016-11-15 07:47:53.419 bundle.js:258 true
 * 2016-11-15 07:47:53.419 bundle.js:258 false
 * 2016-11-15 07:47:53.420 bundle.js:258 false
 * 2016-11-15 07:47:53.421 bundle.js:258 false
 * 2016-11-15 07:47:53.421 bundle.js:258 false
 * 2016-11-15 07:47:53.421 bundle.js:258 true
 * 2016-11-15 07:47:53.422 bundle.js:258 false
 * 2016-11-15 07:47:53.422 bundle.js:258 false
 * 2016-11-15 07:47:53.423 bundle.js:258 false
 * 2016-11-15 07:47:53.423 bundle.js:258 false
 * 2016-11-15 07:47:53.424 bundle.js:258 false
 * 2016-11-15 07:47:53.424 bundle.js:258 true
 */
public class TDevRnd_01
{
    private static final int kN = 40;
    
    public static void RunRnd_01 ()
    {
        int             i;
        double          x;
        boolean         b;
        TRndMT          rndGen;
        
        rndGen = new TRndMT ();
        console.log ();
        console.log ("=========================================================");
        console.log ("TDevRnd_01");
        console.log ("=========================================================");
        console.log ("GetDouble");
        console.log ("------------------------------------------");
        for (i = 0; i < kN; i++)
        {
            x = rndGen.GetDouble ();
            console.log (x);
        }
        
        console.log ("------------------------------------------");
        console.log ("GetIntBetween (2, 4)");
        console.log ("------------------------------------------");
        for (i = 0; i < kN; i++)
        {
            x = rndGen.GetIntBetween (2, 4);
            console.log (x);
        }
        
        console.log ("------------------------------------------");
        console.log ("GetIntBetween (-1, 1)");
        console.log ("------------------------------------------");
        for (i = 0; i < kN; i++)
        {
            x = rndGen.GetIntBetween (-1, 1);
            console.log (x);
        }
        
        console.log ("------------------------------------------");
        console.log ("GetBoolean ()");
        console.log ("------------------------------------------");
        for (i = 0; i < kN; i++)
        {
            b = rndGen.GetBoolean ();
            console.log (b);
        }
    }
}
