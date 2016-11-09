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

package fuzztest.generator.rule.cClass;

import fuzztest.generator.rule.TStrategy;
import fuzztest.generator.rule.VNode;
import fuzztest.utils.gen.TGenData;

/**
 * @author peter
 *
 */
class TCharacterRange extends VCharSet
{
    private char            fHiChar;
    private char            fLoChar;
    
    public TCharacterRange (String loChar, String hiChar)
    {
        _AssertOk (loChar, hiChar);
        fLoChar = loChar.charAt (0);
        fHiChar = hiChar.charAt (0);
    }
    
    /* (non-Javadoc)
     * @see fuzztest.generator.rule.cClass.VCharSet#GetChar()
     */
    @Override
    public char GetChar (TStrategy s)
    {
        boolean         doFollow;
        boolean         doLowerRange;
        char            loChar;
        char            hiChar;
        char            ret;

        doFollow = VNode.DoesFollowRule (s);
        if (doFollow)
        {
            ret = TGenData.GetChar (fLoChar, fHiChar);
        }
        else
        {
            if (fLoChar == '\u0000'  &&  fHiChar == '\uFFFF')
            {
                /* [100] */
                ret     = TGenData.GetChar ();
            }
            else if (fLoChar == '\u0000')
            {
                loChar  = (char) (fHiChar + 1);
                ret     = TGenData.GetChar (loChar, '\uFFFF');
            }
            else if (fHiChar == '\uFFFF')
            {
                hiChar  = (char) (fLoChar - 1);
                ret     = TGenData.GetChar ('\u0000', hiChar);
            }
            else
            {
                doLowerRange = TGenData.GetBoolean ();
                if (doLowerRange)
                {
                    hiChar  = (char) (fLoChar-1);
                    ret     = TGenData.GetChar ('\u0000', hiChar);
                }
                else
                {
                    loChar  = (char) (fHiChar + 1);
                    ret     = TGenData.GetChar (loChar, '\uFFFF');
                }
            }
        }
        
        return ret;
    }

    /**
     * @param loChar
     * @param hiChar
     */
    private void _AssertOk (String loChar, String hiChar)
    {
        int         l1;
        int         l2;
        int         order;
        
        l1    = loChar.length ();
        l2    = hiChar.length ();
        order = hiChar.compareTo (loChar);
        
        if (l1 != 1)
        {
            throw new IllegalArgumentException ("For loChar: Use string of length 1 (single character string).");
        }
        if (l2 != 1)
        {
            throw new IllegalArgumentException ("For hiChar: Use string of length 1 (single character string).");
        }
        if (order <= 0)
        {
            throw new IllegalArgumentException ("loChar must lexically precede hiChar.");
        }
    }
}

/*
[100]   In that place it's better to provide some data than to throw an exception. 
        Therefore we ignore the rule adhesion and return a random character.
 */
