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

import jsweet.lang.RangeError;

/**
 * @author peter
 *
 */
public class TGenData
{
    private static TRndMT   gRndGen = new TRndMT ();
    
    /**
     * @return      A random boolean.
     */
    public static boolean GetBoolean ()
    {
        boolean ret;
        
        ret = gRndGen.GetBoolean ();
        
        return ret;
    }
    
    /**
     * @return      A random character within the full unicode range, [0, 65535].
     */
    public static char GetChar ()
    {
        char ret;
        
        ret = (char) _GetIntBetween ('\u0000', '\uFFFF');        
        
        return ret;
    }
    
    /**
     * @param   loChar    The lowest possible character.
     * @param   hiChar    The highest possible character.
     * @return            A random character in the range [loChar, hiChar]. 
     */
    public static char GetChar (char loChar, char hiChar)
    {
        char ret;
        
        if (loChar < '\u0000'  || loChar > '\uFFFF')
        {
            throw new RangeError ("Constraints problem: Lower boundery must be in [u0000, uFFFF]. Given: " + (1 * loChar));
        }
        else if (hiChar < '\u0000'  ||  hiChar > '\uFFFF')
        {
            throw new RangeError ("Constraints problem: Upper boundery must be in [u0000, uFFFF]. Given: " + (1 * hiChar));
        }
        else if (loChar >= hiChar)
        {
            throw new RangeError ("Constraints problem: Required: loChar < hiChar. Given: loChar: " + (1 * loChar) + ", hiChar: " + (1 * hiChar));
        }
        
        ret = (char) _GetIntBetween (loChar, hiChar);
        
        return ret;
    }
    
    /**
     * Returns an integer number between <code>0</code> and <code>maxN</code> (exclusive).
     * Convenience method, useful for creating random array indices.
     * 
     * @param       max     Possible maximum less one.
     * @return              Random integer in range [0, maxN[
     */
    public static int GetIntUpTo (int max)
    {
        int xMax;
        int ret;
        
        xMax = max - 1;
        ret  = _GetIntBetween (0, xMax);
        
        return ret;
    }

    /**
     * Returns an integer number between <code>min</code> (inclusive) and <code>max</code> (inclusive).
     * 
     * @param       min     Possible minimum.
     * @param       max     Possible maximum.
     * @return              Random value in range [min, max].
     */
    public static int GetIntBetween (int min, int max)
    {
        int ret;
        
        ret = _GetIntBetween (min, max);
        
        return ret;
    }

    /**
     * Returns an integer number between <code>min</code> (inclusive) and <code>max</code> (inclusive).
     * 
     * @param       min     Possible minimum.
     * @param       max     Possible maximum.
     * @return              Random value in range [min, max].
     */
    private static int _GetIntBetween (int min, int max)
    {
        int ret;
        
        ret = gRndGen.GetIntBetween (min, max);
        
        return ret;
    }
}
