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
class TCharacterPoint extends VCharSet
{
    private String          fChar;
    
    public TCharacterPoint (String ch)
    {
        _AssertOK (ch);
        fChar = ch;
    }

    /* (non-Javadoc)
     * @see fuzztest.generator.rule.characterClass.VCharSet#IsMatch()
     */
    @Override
    public boolean IsMatch (String ch)
    {
        boolean ret;
        
        ret = ch.equals (fChar);
        
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
