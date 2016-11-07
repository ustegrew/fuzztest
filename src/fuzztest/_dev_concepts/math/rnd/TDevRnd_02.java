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

import fuzztest.utils.gen.TGenData;

/**
 * @author peter
 *
 */
public class TDevRnd_02
{
    private static final int kN = 40;
    
    public static void RunRnd_02 ()
    {
        int             i;
        double          x;
        boolean         b;
        
        console.log ();
        console.log ("=========================================================");
        console.log ("TDevRnd_02");
        console.log ("=========================================================");
        console.log ("GetDouble");
        console.log ("------------------------------------------");
        for (i = 0; i < kN; i++)
        {
            x = TGenData.GetDouble ();
            console.log (x);
        }
        
        console.log ("------------------------------------------");
        console.log ("GetIntBetween (2, 4)");
        console.log ("------------------------------------------");
        for (i = 0; i < kN; i++)
        {
            x = TGenData.GetIntBetween (2, 4);
            console.log (x);
        }
        
        console.log ("------------------------------------------");
        console.log ("GetIntBetween (-1, 1)");
        console.log ("------------------------------------------");
        for (i = 0; i < kN; i++)
        {
            x = TGenData.GetIntBetween (-1, 1);
            console.log (x);
        }
        
        console.log ("------------------------------------------");
        console.log ("GetBoolean ()");
        console.log ("------------------------------------------");
        for (i = 0; i < kN; i++)
        {
            b = TGenData.GetBoolean ();
            console.log (b);
        }
    }
}