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

import java.util.ArrayList;

import fuzztest.generator.rule.TStrategy;
import fuzztest.generator.rule.VNode;
import fuzztest.utils.gen.TGenData;
import fuzztest.utils.store.TArrayList;

/**
 * A single character generator. Creates characters that (don't) match a given character class.
 * The character class can have multiple character ranges or character points, such as
 * <code>[0-9]</code> or <code>[a-z][0-9]_</code>.
 * 
 * Corresponding PEGjs rules:
 * 
 * <pre>
 * CharacterClassMatcher "character class"
 *   = "[" inverted:"^"? parts:(ClassCharacterRange / ClassCharacter)* "]" ignoreCase:"i"?
 *     {
 *         var _i;
 *         var _parts;
 *         var _filteredEmptyStrings;
 *         
 *         _parts = [];
 *         if (parts.length >= 1)
 *         {
 *             for (i = 0; i < parts.length; i++)
 *             {
 *                 if (parts [i] !== "")
 *                 {
 *                     _parts.push (parts[i]);
 *                 }
 *             }
 *         }
 *         
 *         return 
 *         {
 *             type:               "class",
 *             parts:              _parts,
 *             inverted:           inverted !== null,
 *             ignoreCase:         ignoreCase !== null,
 *             location:           location()
 *         };
 *     }
 * 
 * ClassCharacterRange
 *     = begin:ClassCharacter "-" end:ClassCharacter 
 *     {
 *         if (begin.charCodeAt(0) > end.charCodeAt(0)) 
 *         {
 *             error ("Invalid character range: " + text() + ".");
 *         }
 * 
 *         return [begin, end];
 *     }
 * 
 * ClassCharacter
 *     = !("]" / "\\" / LineTerminator) SourceCharacter 
 *     {
 *         return text ();
 *     }
 *     / "\\" sequence:EscapeSequence 
 *     {
 *         return sequence;
 *     }
 *     / LineContinuation
 * </pre>
 * 
 * @author peter
 */
public class TCharacterClass extends VNode
{
    private TArrayList<VCharSet>     fSets;
    
    /**
     * cTor. 
     */
    public TCharacterClass ()
    {
        super ();
        fSets = new TArrayList<> ();
    }
    
    public void AddPoint (String ch)
    {
        TCharacterPoint         set;
        
        set = new TCharacterPoint (ch);
        fSets.Add (set);
    }
    
    /**
     * @param string
     * @param string2
     */
    public void AddRange (String loChar, String hiChar)
    {
        TCharacterRange         set;
        
        set = new TCharacterRange (loChar, hiChar);
        fSets.Add (set);
    }
    
    protected String _CreateData (TStrategy s, String head)
    {
        int         n;
        VCharSet    cs;
        int         x;
        String      ret;

        n   = fSets.GetNumElements ();
        if (n >= 1)
        {
            x       = TGenData.GetInt (0, n-1);
            cs      = fSets.Get (x);
            ret     = head + cs.GetChar (s);
        }
        else
        {
            ret     = head;
        }
        
        return ret;
    }
}
