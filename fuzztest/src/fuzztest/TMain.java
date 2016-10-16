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

package fuzztest;

import fuzztest.generator.rule.TStrategy;
import fuzztest.generator.rule.TStrategy.ERuleAdhesion;
import fuzztest.generator.rule.characterClass.TCharacterClass;

/**
 * @author peter
 *
 */
public class TMain
{
    /**
     * @param args
     */
    public static void main (String[] args)
    {
        TStrategy           s;
        TCharacterClass     cc;
        String              p;
        
        cc = new TCharacterClass ();
        cc.AddRange ("a", "z", false);
        cc.AddRange ("A", "Z", false);
        cc.AddPoint ("_");
        
        s  = new TStrategy (5, ERuleAdhesion.kFollowRule);
        for (int i = 1; i <= 50; i++)
        {
            p = cc.CreateData (s, "data: ");
            System.out.print (p);
        }
        System.out.println ();

        s  = new TStrategy (5, ERuleAdhesion.kInjectInvalids);
        for (int i = 1; i <= 50; i++)
        {
            p = cc.CreateData (s, "dataNoFollow: ");
            System.out.print (p);
        }
        System.out.println ();
    }
    
}
