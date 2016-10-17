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

package fuzztest.generator.rule.characterClass;

import fuzztest.generator.rule.TStrategy;
import fuzztest.generator.rule.TStrategy.ERuleAdhesion;
import fuzztest.utils.gen.TGenData;

/**
 * @author peter
 *
 */
class TCharacterPoint extends VCharSet
{
    private char        fChar;
    
    public TCharacterPoint (String ch)
    {
        _AssertOK (ch);
        fChar = ch.charAt (0);
    }

    /* (non-Javadoc)
     * @see fuzztest.generator.rule.characterClass.VCharSet#GetChar()
     */
    @Override
    public char GetChar (TStrategy s)
    {
        ERuleAdhesion       r;
        boolean             doHead;
        char                loChar;
        char                hiChar;
        char                ret;
        
        r = s.GetRuleAdhesion ();
        if (r == ERuleAdhesion.kFollowRule)
        {
            ret = fChar;
        }
        else
        {
            if (fChar == '\u0000')
            {
                loChar  = '\u0001';
                hiChar  = '\uFFFF'; 
                ret     = TGenData.GetChar (loChar, hiChar);
            }
            else if (fChar == '\uFFFF')
            {
                loChar  = '\u0000';
                hiChar  = '\uFFFE';
                ret     = TGenData.GetChar (loChar, hiChar);
            }
            else
            {
                doHead  = TGenData.GetBoolean ();
                if (doHead)
                {
                    loChar  = '\u0000';
                    hiChar  = (char) (fChar-1);
                    ret     = TGenData.GetChar (loChar, hiChar);
                }
                else
                {
                    loChar  = (char) (fChar + 1);
                    hiChar  = (char) ('\uFFFF');
                    ret     = TGenData.GetChar (loChar, hiChar);
                }
            }
        }
        
        return ret;
    }

    /**
     * @param ch
     */
    private void _AssertOK (String ch)
    {
        int         l;
        
        l = ch.length ();
        if (l != 1)
        {
            throw new IllegalArgumentException ("For ch: Use string of length 1 (single character string).");
        }
    }
}
