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

/**
 * @author peter
 *
 */
class TCharacterRange extends VCharSet
{
    private String          fHiChar;
    private String          fLoChar;
    private String          fRe;
    
    public TCharacterRange (String loChar, String hiChar, boolean isInverse)
    {
        String loEsc;
        String hiEsc;
        
        _AssertOk (loChar, hiChar);
        fLoChar = loChar;
        fHiChar = hiChar;
        
        loEsc   = _GetEscaped (loChar);
        hiEsc   = _GetEscaped (hiChar);
        fRe     = isInverse  ?  
                    "^[^" + loEsc + "-" + hiEsc + "]$"
                  : 
                    "^[" + loEsc + "-" + hiEsc + "]$";
    }
    
    /* (non-Javadoc)
     * @see fuzztest.generator.rule.characterClass.VCharSet#IsMatch()
     */
    @Override
    public boolean IsMatch (String ch)
    {
        boolean ret;
        
        ret = ch.matches (fRe);
        
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
