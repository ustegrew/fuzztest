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

package fuzztest._dev_concepts.grammar.build;

import static jsweet.dom.Globals.console;
import static jsweet.lang.Globals.eval;

import fuzztest.generator.TRepository;
import fuzztest.generator.rule._common.ERuleAdhesion;
import fuzztest.generator.rule._common.TAttributeSet;
import fuzztest.generator.rule._common.VNode;
import fuzztest.generator.rule.cClass.TCharacterClass;
import jsweet.dom.Globals;
import jsweet.lang.Math;

/**
 * Concept test: Build grammar tree
 * 
 * @author peter
 * 
 * Output was:
 * w9f_5_n9x0
 * 77 39 66 5f 35 5f 6e 39 78 30 NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN 
 * ˄_s⼴5#7tlo
 * 2c4 5f 73 2f34 35 23 37 74 6c 6f NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN NaN  
 */
public class TDevBuildGrammar_01
{
    private static final int            kNChars = 40;
    
    public static void TestTree01 ()
    {
      TCharacterClass     cc;
      jsweet.lang.String  ch;
      jsweet.lang.String  chx;
      String              s0;
      String              s1;
      
      console.log ();
      console.log ("=========================================================");
      console.log ("TDevBuildGrammar_01");
      console.log ("=========================================================");

      TRepository.Clear ();
      cc = new TCharacterClass 
      (
          new TAttributeSet (null, 9, ERuleAdhesion.kFollowRule, 9, false)
      );
      cc.AddRange ("a", "z");
      cc.AddRange ("0", "9");
      cc.AddPoint ("_");
      s0  = "";
      s1  = "";
      for (int i = 1; i <= kNChars + 2; i++)
      {
          ch        = (jsweet.lang.String) (Object) cc.CreateData ("");
          chx       = (jsweet.lang.String) (Object) (new jsweet.lang.Number (ch.charCodeAt (0))).toString (16);
          s0       += ch;
          s1       += chx + " ";
      }
      console.log (s0);
      console.log (s1);
      console.log ();

      TRepository.Clear ();
      cc = new TCharacterClass 
      (
          new TAttributeSet (null, 9, ERuleAdhesion.kInjectInvalids, 9, false)
      );
      cc.AddRange ("a", "z");
      cc.AddRange ("0", "9");
      cc.AddPoint ("_");
      s0  = "";
      s1  = "";
      for (int i = 1; i <= kNChars + 2; i++)
      {
          ch        = (jsweet.lang.String) (Object) cc.CreateData ("");
          chx       = (jsweet.lang.String) (Object) (new jsweet.lang.Number (ch.charCodeAt (0))).toString (16);
          s0       += ch;
          s1       += chx + " ";
      }
      console.log (s0);
      console.log (s1);
    }
}
