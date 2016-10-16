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
abstract class VCharSet
{
    private static final String kCharsEscape = "[\\[\\]\\^\\-]";
    
    public abstract boolean IsMatch (String ch);
    
    protected String _GetEscaped (String ch)
    {
        boolean     doEsc;
        String      ret;
        
        doEsc = ch.matches (kCharsEscape);
        ret   = doEsc  ?  "\\" + ch  :  ch;
        
        return ret;
    }
}
