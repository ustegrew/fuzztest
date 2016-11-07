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

import fuzztest.generator.rule.ERuleAdhesion;
import fuzztest.generator.rule.TStrategy;
import fuzztest.generator.rule.VNode;
import fuzztest.generator.rule.cClass.TCharacterClass;
import jsweet.dom.Globals;
import jsweet.lang.Math;

/**
 * Concept test: Build grammar tree
 * 
 * @author peter
 */
public class TDevBuildGrammar_01
{
    private static final int            kNChars = 40;
    
    public static void TestTree01 ()
    {
      TStrategy           s;
      TCharacterClass     cc;
      jsweet.lang.String  ch;
      jsweet.lang.String  chx;
      jsweet.lang.Number  ccode;
      String              s0;
      String              s1;
      
      console.log ();
      console.log ("=========================================================");
      console.log ("TDevBuildGrammar_01");
      console.log ("=========================================================");
      cc = new TCharacterClass ();
      cc.AddRange ("a", "z");
      cc.AddRange ("0", "9");
      cc.AddPoint ("_");
      
      VNode.ClearVisitCounters ();
      s   = new TStrategy (9, ERuleAdhesion.kFollowRule, kNChars);
      s0  = "";
      s1  = "";
      for (int i = 1; i <= kNChars + 2; i++)
      {
          ch        = (jsweet.lang.String) (Object) cc.CreateData (s, "");
          chx       = (jsweet.lang.String) (Object) (new jsweet.lang.Number (ch.charCodeAt (0))).toString (16);
          s0       += ch;
          s1       += chx + " ";
      }
      console.log (s0);
      console.log (s1);
      console.log ();

      VNode.ClearVisitCounters ();
      s   = new TStrategy (9, ERuleAdhesion.kInjectInvalids, kNChars);
      s0  = "";
      s1  = "";
      for (int i = 1; i <= kNChars + 2; i++)
      {
          ch        = (jsweet.lang.String) (Object) cc.CreateData (s, "");
          chx       = (jsweet.lang.String) (Object) (new jsweet.lang.Number (ch.charCodeAt (0))).toString (16);
          s0       += ch;
          s1       += chx + " ";
      }
      console.log (s0);
      console.log (s1);
    }
}
