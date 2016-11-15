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

import fuzztest.generator.TRepository;
import fuzztest.generator.rule._common.ERuleAdhesion;
import fuzztest.generator.rule._common.TAttributeSet;
import fuzztest.generator.rule._common.VNode;
import fuzztest.generator.rule.cClass.TCharacterClass;
import fuzztest.generator.rule.grammar.TGrammar;
import fuzztest.generator.rule.literal.TLiteral;
import fuzztest.generator.rule.rule.TRule;
import fuzztest.generator.rule.sequence.TSequence;

/**
 * @author peter
 * 
 * Output (excerpt):
 * 
 * 2016-11-15 08:07:38.378 bundle.js:905 =========================================================
 * 2016-11-15 08:07:38.378 bundle.js:906 TDevBuildGrammar_02
 * 2016-11-15 08:07:38.378 bundle.js:907 =========================================================
 * 2016-11-15 08:07:38.381 bundle.js:911 hello-==2
 * 2016-11-15 08:07:38.383 bundle.js:911 hello-world=c
 * 2016-11-15 08:07:38.383 bundle.js:911 hello-==a
 * 2016-11-15 08:07:38.384 bundle.js:911 hello-==3
 * 2016-11-15 08:07:38.385 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.388 bundle.js:911 hello-worldworld7
 * 2016-11-15 08:07:38.388 bundle.js:911 hello-world=9
 * 2016-11-15 08:07:38.390 bundle.js:911 hello--world4
 * 2016-11-15 08:07:38.391 bundle.js:911 hello--world2
 * 2016-11-15 08:07:38.392 bundle.js:911 hello--=c
 * 2016-11-15 08:07:38.394 bundle.js:911 hello-worldhello*
 * 2016-11-15 08:07:38.394 bundle.js:911 hello--=5
 * 2016-11-15 08:07:38.395 bundle.js:911 hello-==*
 * 2016-11-15 08:07:38.397 bundle.js:911 hello-hello=*
 * 2016-11-15 08:07:38.398 bundle.js:911 hello-hello-d
 * 2016-11-15 08:07:38.399 bundle.js:911 hello-worldhello*
 * 2016-11-15 08:07:38.400 bundle.js:911 hello-worldworld9
 * 2016-11-15 08:07:38.401 bundle.js:911 hello-worldhello*
 * 2016-11-15 08:07:38.403 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.404 bundle.js:911 hello-==e
 * 2016-11-15 08:07:38.406 bundle.js:911 hello-hellohello*
 * 2016-11-15 08:07:38.407 bundle.js:911 hello-world=4
 * 2016-11-15 08:07:38.407 bundle.js:911 hello-hello=9
 * 2016-11-15 08:07:38.408 bundle.js:911 hello-=helloc
 * 2016-11-15 08:07:38.409 bundle.js:911 hello-world=b
 * 2016-11-15 08:07:38.409 bundle.js:911 hello---*
 * 2016-11-15 08:07:38.412 bundle.js:911 hello-hello-*
 * 2016-11-15 08:07:38.414 bundle.js:911 hello-worldworldd
 * 2016-11-15 08:07:38.415 bundle.js:911 hello-=world0
 * 2016-11-15 08:07:38.416 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.416 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.417 bundle.js:911 hello-world=8
 * 2016-11-15 08:07:38.418 bundle.js:911 hello-world=f
 * 2016-11-15 08:07:38.419 bundle.js:911 hello--hello*
 * 2016-11-15 08:07:38.420 bundle.js:911 hello-hello=7
 * 2016-11-15 08:07:38.420 bundle.js:911 hello--=*
 * 2016-11-15 08:07:38.421 bundle.js:911 hello-worldhello*
 * 2016-11-15 08:07:38.422 bundle.js:911 hello---e
 * 2016-11-15 08:07:38.423 bundle.js:911 hello-worldworld*
 * 2016-11-15 08:07:38.423 bundle.js:911 hello-worldhelloe
 * 2016-11-15 08:07:38.424 bundle.js:911 hello--=6
 * 2016-11-15 08:07:38.425 bundle.js:911 hello-world=c
 * 2016-11-15 08:07:38.425 bundle.js:911 hello--=b
 * 2016-11-15 08:07:38.426 bundle.js:911 hello-hello-c
 * 2016-11-15 08:07:38.426 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.427 bundle.js:911 hello-world=0
 * 2016-11-15 08:07:38.428 bundle.js:911 hello-world-7
 * 2016-11-15 08:07:38.429 bundle.js:911 hello-worldworldc
 * 2016-11-15 08:07:38.430 bundle.js:911 hello-worldhellof
 * 2016-11-15 08:07:38.432 bundle.js:911 hello-=-*
 * 2016-11-15 08:07:38.433 bundle.js:911 hello-world=0
 * 2016-11-15 08:07:38.434 bundle.js:911 hello-worldhello7
 * 2016-11-15 08:07:38.434 bundle.js:911 hello---*
 * 2016-11-15 08:07:38.435 bundle.js:911 hello-world=e
 * 2016-11-15 08:07:38.436 bundle.js:911 hello--helloe
 * 2016-11-15 08:07:38.437 bundle.js:911 hello--=b
 * 2016-11-15 08:07:38.438 bundle.js:911 hello-hello-*
 * 2016-11-15 08:07:38.439 bundle.js:911 hello-=worlda
 * 2016-11-15 08:07:38.440 bundle.js:911 hello-worldhellod
 * 2016-11-15 08:07:38.441 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.441 bundle.js:911 hello-world-*
 * 2016-11-15 08:07:38.442 bundle.js:911 hello-hellohello9
 * 2016-11-15 08:07:38.443 bundle.js:911 hello-==b
 * 2016-11-15 08:07:38.443 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.444 bundle.js:911 hello--=e
 * 2016-11-15 08:07:38.445 bundle.js:911 hello-world=2
 * 2016-11-15 08:07:38.445 bundle.js:911 hello-worldhellof
 * 2016-11-15 08:07:38.446 bundle.js:911 hello-==c
 * 2016-11-15 08:07:38.447 bundle.js:911 hello-world=c
 * 2016-11-15 08:07:38.447 bundle.js:911 hello-==*
 * 2016-11-15 08:07:38.448 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.449 bundle.js:911 hello-worldhellof
 * 2016-11-15 08:07:38.450 bundle.js:911 hello-world-*
 * 2016-11-15 08:07:38.451 bundle.js:911 hello-world-1
 * 2016-11-15 08:07:38.452 bundle.js:911 hello-=hello5
 * 2016-11-15 08:07:38.453 bundle.js:911 hello-hello=*
 * 2016-11-15 08:07:38.453 bundle.js:911 hello-==c
 * 2016-11-15 08:07:38.454 bundle.js:911 hello-world=c
 * 2016-11-15 08:07:38.455 bundle.js:911 hello-world-0
 * 2016-11-15 08:07:38.456 bundle.js:911 hello--=*
 * 2016-11-15 08:07:38.462 bundle.js:911 hello-world-*
 * 2016-11-15 08:07:38.463 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.464 bundle.js:911 hello-=helloa
 * 2016-11-15 08:07:38.465 bundle.js:911 hello-hello=e
 * 2016-11-15 08:07:38.465 bundle.js:911 hello--worldf
 * 2016-11-15 08:07:38.466 bundle.js:911 hello-hello-*
 * 2016-11-15 08:07:38.466 bundle.js:911 hello-world-*
 * 2016-11-15 08:07:38.467 bundle.js:911 hello---6
 * 2016-11-15 08:07:38.467 bundle.js:911 hello-=-8
 * 2016-11-15 08:07:38.468 bundle.js:911 hello-=hello6
 * 2016-11-15 08:07:38.468 bundle.js:911 hello-==e
 * 2016-11-15 08:07:38.469 bundle.js:911 hello-hellohello0
 * 2016-11-15 08:07:38.470 bundle.js:911 hello-=hello*
 * 2016-11-15 08:07:38.470 bundle.js:911 hello-worldhelloe
 * 2016-11-15 08:07:38.471 bundle.js:911 hello-helloworldb
 * 2016-11-15 08:07:38.471 bundle.js:911 hello--=*
 * 2016-11-15 08:07:38.472 bundle.js:911 hello-worldhelloc
 * 2016-11-15 08:07:38.472 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.473 bundle.js:911 hello-worldworld2
 * 2016-11-15 08:07:38.474 bundle.js:911 hello-world-1
 * 2016-11-15 08:07:38.474 bundle.js:911 hello-worldhello*
 * 2016-11-15 08:07:38.474 bundle.js:911 hello-world=0
 * 2016-11-15 08:07:38.475 bundle.js:911 hello-==*
 * 2016-11-15 08:07:38.476 bundle.js:911 hello-==c
 * 2016-11-15 08:07:38.476 bundle.js:911 hello-=world6
 * 2016-11-15 08:07:38.477 bundle.js:911 hello-worldworlda
 * 2016-11-15 08:07:38.477 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.478 bundle.js:911 hello-worldhellob
 * 2016-11-15 08:07:38.479 bundle.js:911 hello-world-5
 * 2016-11-15 08:07:38.479 bundle.js:911 hello-world=4
 * 2016-11-15 08:07:38.480 bundle.js:911 hello-==8
 * 2016-11-15 08:07:38.483 bundle.js:911 hello-worldhello*
 * 2016-11-15 08:07:38.484 bundle.js:911 hello--=*
 * 2016-11-15 08:07:38.484 bundle.js:911 hello-world-*
 * 2016-11-15 08:07:38.486 bundle.js:911 hello-world=a
 * 2016-11-15 08:07:38.486 bundle.js:911 hello-=-3
 * 2016-11-15 08:07:38.487 bundle.js:911 hello-hello=*
 * 2016-11-15 08:07:38.487 bundle.js:911 hello-worldworlde
 * 2016-11-15 08:07:38.488 bundle.js:911 hello-=hello0
 * 2016-11-15 08:07:38.489 bundle.js:911 hello-hellohello8
 * 2016-11-15 08:07:38.489 bundle.js:911 hello-hello=6
 * 2016-11-15 08:07:38.490 bundle.js:911 hello--hello2
 * 2016-11-15 08:07:38.490 bundle.js:911 hello-world-*
 * 2016-11-15 08:07:38.491 bundle.js:911 hello-hello=2
 * 2016-11-15 08:07:38.492 bundle.js:911 hello-worldhello3
 * 2016-11-15 08:07:38.493 bundle.js:911 hello-==c
 * 2016-11-15 08:07:38.494 bundle.js:911 hello-world=0
 * 2016-11-15 08:07:38.494 bundle.js:911 hello-==*
 * 2016-11-15 08:07:38.496 bundle.js:911 hello-hello=3
 * 2016-11-15 08:07:38.496 bundle.js:911 hello-==c
 * 2016-11-15 08:07:38.497 bundle.js:911 hello--worldc
 * 2016-11-15 08:07:38.498 bundle.js:911 hello--=c
 * 2016-11-15 08:07:38.499 bundle.js:911 hello-worldhellob
 * 2016-11-15 08:07:38.500 bundle.js:911 hello--=b
 * 2016-11-15 08:07:38.500 bundle.js:911 hello-worldworldf
 * 2016-11-15 08:07:38.501 bundle.js:911 hello-hello=*
 * 2016-11-15 08:07:38.501 bundle.js:911 hello-hello-f
 * 2016-11-15 08:07:38.502 bundle.js:911 hello--=0
 * 2016-11-15 08:07:38.502 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.503 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.503 bundle.js:911 hello---*
 * 2016-11-15 08:07:38.503 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.504 bundle.js:911 hello-worldworld2
 * 2016-11-15 08:07:38.504 bundle.js:911 hello-==2
 * 2016-11-15 08:07:38.505 bundle.js:911 hello-world=9
 * 2016-11-15 08:07:38.508 bundle.js:911 hello-==c
 * 2016-11-15 08:07:38.508 bundle.js:911 hello-worldworld*
 * 2016-11-15 08:07:38.509 bundle.js:911 hello-worldworld7
 * 2016-11-15 08:07:38.509 bundle.js:911 hello--=*
 * 2016-11-15 08:07:38.510 bundle.js:911 hello--=*
 * 2016-11-15 08:07:38.510 bundle.js:911 hello-hellohelloa
 * 2016-11-15 08:07:38.511 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.511 bundle.js:911 hello--=*
 * 2016-11-15 08:07:38.511 bundle.js:911 hello-=-9
 * 2016-11-15 08:07:38.512 bundle.js:911 hello-helloworldb
 * 2016-11-15 08:07:38.512 bundle.js:911 hello--=0
 * 2016-11-15 08:07:38.512 bundle.js:911 hello-world=3
 * 2016-11-15 08:07:38.513 bundle.js:911 hello-world=b
 * 2016-11-15 08:07:38.513 bundle.js:911 hello-=-8
 * 2016-11-15 08:07:38.514 bundle.js:911 hello--=c
 * 2016-11-15 08:07:38.514 bundle.js:911 hello-world=9
 * 2016-11-15 08:07:38.514 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.515 bundle.js:911 hello-worldworldd
 * 2016-11-15 08:07:38.515 bundle.js:911 hello-worldworld*
 * 2016-11-15 08:07:38.516 bundle.js:911 hello-=worldb
 * 2016-11-15 08:07:38.516 bundle.js:911 hello--hello5
 * 2016-11-15 08:07:38.516 bundle.js:911 hello-worldhello4
 * 2016-11-15 08:07:38.517 bundle.js:911 hello-hello-d
 * 2016-11-15 08:07:38.517 bundle.js:911 hello--=*
 * 2016-11-15 08:07:38.517 bundle.js:911 hello-worldhello2
 * 2016-11-15 08:07:38.518 bundle.js:911 hello-world=e
 * 2016-11-15 08:07:38.518 bundle.js:911 hello-worldhello*
 * 2016-11-15 08:07:38.519 bundle.js:911 hello-worldworldd
 * 2016-11-15 08:07:38.519 bundle.js:911 hello-world=a
 * 2016-11-15 08:07:38.520 bundle.js:911 hello-world=8
 * 2016-11-15 08:07:38.520 bundle.js:911 hello-world=3
 * 2016-11-15 08:07:38.520 bundle.js:911 hello-==*
 * 2016-11-15 08:07:38.521 bundle.js:911 hello-worldworld6
 * 2016-11-15 08:07:38.521 bundle.js:911 hello-world-*
 * 2016-11-15 08:07:38.522 bundle.js:911 hello-worldworld8
 * 2016-11-15 08:07:38.522 bundle.js:911 hello-world=3
 * 2016-11-15 08:07:38.522 bundle.js:911 hello--=8
 * 2016-11-15 08:07:38.523 bundle.js:911 hello-world=9
 * 2016-11-15 08:07:38.523 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.523 bundle.js:911 hello-world=b
 * 2016-11-15 08:07:38.524 bundle.js:911 hello-worldhello*
 * 2016-11-15 08:07:38.524 bundle.js:911 hello-hello-*
 * 2016-11-15 08:07:38.525 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.525 bundle.js:911 hello-worldworldd
 * 2016-11-15 08:07:38.525 bundle.js:911 hello-hello=1
 * 2016-11-15 08:07:38.526 bundle.js:911 hello--world*
 * 2016-11-15 08:07:38.527 bundle.js:911 hello-=hello0
 * 2016-11-15 08:07:38.527 bundle.js:911 hello-world-b
 * 2016-11-15 08:07:38.528 bundle.js:911 hello-worldhelloe
 * 2016-11-15 08:07:38.528 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.529 bundle.js:911 hello-=-4
 * 2016-11-15 08:07:38.529 bundle.js:911 hello-worldhellof
 * 2016-11-15 08:07:38.530 bundle.js:911 hello--world*
 * 2016-11-15 08:07:38.530 bundle.js:911 hello-==*
 * 2016-11-15 08:07:38.531 bundle.js:911 hello--world*
 * 2016-11-15 08:07:38.531 bundle.js:911 hello-world=3
 * 2016-11-15 08:07:38.531 bundle.js:911 hello-worldworld4
 * 2016-11-15 08:07:38.532 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.532 bundle.js:911 hello-hello=6
 * 2016-11-15 08:07:38.532 bundle.js:911 hello-world=4
 * 2016-11-15 08:07:38.533 bundle.js:911 hello-hello=c
 * 2016-11-15 08:07:38.533 bundle.js:911 hello-==e
 * 2016-11-15 08:07:38.537 bundle.js:911 hello-==f
 * 2016-11-15 08:07:38.537 bundle.js:911 hello-worldworld*
 * 2016-11-15 08:07:38.538 bundle.js:911 hello-hellohello*
 * 2016-11-15 08:07:38.538 bundle.js:911 hello-hello-8
 * 2016-11-15 08:07:38.538 bundle.js:911 hello-world-*
 * 2016-11-15 08:07:38.539 bundle.js:911 hello-hello=9
 * 2016-11-15 08:07:38.539 bundle.js:911 hello-world=a
 * 2016-11-15 08:07:38.540 bundle.js:911 hello-world=f
 * 2016-11-15 08:07:38.540 bundle.js:911 hello-=hello*
 * 2016-11-15 08:07:38.540 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.541 bundle.js:911 hello-world=a
 * 2016-11-15 08:07:38.541 bundle.js:911 hello-helloworld3
 * 2016-11-15 08:07:38.542 bundle.js:911 hello-hellohello*
 * 2016-11-15 08:07:38.542 bundle.js:911 hello---5
 * 2016-11-15 08:07:38.542 bundle.js:911 hello-world=0
 * 2016-11-15 08:07:38.543 bundle.js:911 hello-worldhello2
 * 2016-11-15 08:07:38.543 bundle.js:911 hello---*
 * 2016-11-15 08:07:38.544 bundle.js:911 hello-world-e
 * 2016-11-15 08:07:38.544 bundle.js:911 hello--hello3
 * 2016-11-15 08:07:38.545 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.545 bundle.js:911 hello-world=d
 * 2016-11-15 08:07:38.546 bundle.js:911 hello-world=*
 * 2016-11-15 08:07:38.546 bundle.js:911 hello-worldhelloc
 * 2016-11-15 08:07:38.546 bundle.js:911 hello-world-*
 */
public class TDevBuildGrammar_02
{
    private static final int        kNumCases           = 1000;
    private static final int        kRecursionMax       = 5;
    private static final int        kNumRepeats         = 10;
    
    public static void TestBuild ()
    {
        TGrammar        g;
        TRule           r;
        TSequence       s;
        TCharacterClass c0;
        TLiteral        l0;
        TLiteral        l1;
        TLiteral        l2;
        TLiteral        l3;
        int             i;
        String          x;
        
        TRepository.Clear ();
        
        g  = new TGrammar (new TAttributeSet (null, kRecursionMax, ERuleAdhesion.kFollowRule, kNumRepeats, false));
        r  = new TRule (new TAttributeSet ("start", kRecursionMax, ERuleAdhesion.kFollowRule, kNumRepeats, false));
        
        l0 = new TLiteral           (new TAttributeSet (null, kRecursionMax, ERuleAdhesion.kFollowRule,     kNumRepeats, false));
        l0.SetLiteral ("hello");
        
        l1 = new TLiteral           (new TAttributeSet (null, kRecursionMax, ERuleAdhesion.kFollowRule,     kNumRepeats, false));
        l1.SetLiteral ("-");
        
        l2 = new TLiteral           (new TAttributeSet (null, kRecursionMax, ERuleAdhesion.kInjectInvalids, kNumRepeats, false));
        l2.SetLiteral ("world");
        
        l3 = new TLiteral           (new TAttributeSet (null, kRecursionMax, ERuleAdhesion.kInjectInvalids, kNumRepeats, false));
        l3.SetLiteral ("=");
        
        c0 = new TCharacterClass    (new TAttributeSet (null, kRecursionMax, ERuleAdhesion.kFollowRule,     kNumRepeats, false));
        c0.AddPoint ("*");
        c0.AddRange ("0", "9");
        c0.AddRange ("a", "f");
        
        s  = new TSequence          (new TAttributeSet (null, kRecursionMax, ERuleAdhesion.kFollowRule,     kNumRepeats, false));
        s.Add (l0);
        s.Add (l1);
        s.Add (l2);
        s.Add (l3);
        s.Add (c0);
        
        r.SetExpression (s);
        g.SetExpression (r);
        
        console.log ();
        console.log ("=========================================================");
        console.log ("TDevBuildGrammar_02");
        console.log ("=========================================================");
        for (i = 0; i < kNumCases; i++)
        {
            VNode.ClearVisitCounters ();
            x = g.CreateData ("");
            console.log (x);
        }
    }
}
