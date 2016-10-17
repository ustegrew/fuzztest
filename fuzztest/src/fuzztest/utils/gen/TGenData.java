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

package fuzztest.utils.gen;

import fuzztest.utils.math.MersenneTwister;

/**
 * @author peter
 *
 */
public class TGenData
{
    private static MersenneTwister          gRndGen = new MersenneTwister ();
    
    public static boolean GetBoolean ()
    {
        boolean ret;
        
        ret = gRndGen.nextBoolean ();
        
        return ret;
    }
    
    public static char GetChar ()
    {
        char ret;
        
        ret = _GetChar ('\u0000', '\uFFFF');        
        
        return ret;
    }
    
    public static char GetChar (char loChar, char hiChar)
    {
        char ret;
        
        ret = _GetChar (loChar, hiChar);
        
        return ret;
    }
    
    /**
     * Returns an integer number between <code>0</code> and <code>maxN</code> (exclusive).
     * Useful 
     * 
     * @param       maxN    Possible maximum less one.
     * @return              Random integer in range [0, maxN[
     */
    public static int GetInt (int maxN)
    {
        int ret;
        
        ret = _GetInt (0, maxN-1);
        
        return ret;
    }

    /**
     * Returns an integer number between <code>min</code> (inclusive) and <code>max</code> (inclusive).
     * 
     * @param       min     Possible minimum.
     * @param       max     Possible maximum.
     * @return              Random value in range [min, max].
     */
    public static int GetInt (int min, int max)
    {
        int ret;
        
        ret = _GetInt (min, max);
        
        return ret;
    }

    private static char _GetChar (char loChar, char hiChar)
    {
        int     x;
        int     delta;
        char    ret;
        
        delta = hiChar - loChar + 1;
        x     = gRndGen.nextInt (delta);
        ret   = (char) (loChar + x);
        
        return ret;
    }

    /**
     * Returns an integer number between <code>min</code> (inclusive) and <code>max</code> (inclusive).
     * 
     * @param       min     Possible minimum.
     * @param       max     Possible maximum.
     * @return              Random value in range [min, max].
     */
    private static int _GetInt (int min, int max)
    {
        int x;
        int delta;
        int ret;

        delta = max - min + 1;
        x     = gRndGen.nextInt (delta);
        ret   = min + x;
        
        return ret;
    }
}
