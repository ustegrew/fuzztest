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
 */
public class TDevRnd_01
{
    public static void RunRnd_01 ()
    {
        int             i;
        double          x;
        TRndMT          rndGen;
        
        rndGen = new TRndMT ();
        console.log (rndGen);
        for (i = 0; i < 10; i++)
        {
            x = rndGen.GetDouble ();
            console.log (x);
        }
    }
}
