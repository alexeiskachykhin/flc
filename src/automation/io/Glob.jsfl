'use strict';


function Glob(pattern) {

    var self = this;


    self._matchCharacter = function (patternIndex, stringToMatch, characterIndex) {
        // Pattern has been consumed, we've found a match.
        if (patternIndex >= pattern.length) {
            return true;
        }

        // String has been consumed, no match found.
        if (characterIndex >= stringToMatch.length) {
            return false;
        }

        // Here we have a repetition
        if (pattern[patternIndex] === '*') {

            // Looking ahead, to see if it is time to stop repetition. 
            if (self._matchCharacter(patternIndex + 1, stringToMatch, characterIndex + 1)) {
                return true;
            }

            // Moving forward with repetition.
            return self._matchCharacter(patternIndex, stringToMatch, characterIndex + 1);
        }

        // Character match found, moving forward.
        while (pattern[patternIndex].toUpperCase() === stringToMatch[characterIndex].toUpperCase()) {
            return self._matchCharacter(patternIndex + 1, stringToMatch, characterIndex + 1);
        }

        return false;
    };

    self.matchString = function (stringToMatch) {
        var isMatch = false;

        for (var characterIndex = 0;
             characterIndex < stringToMatch.length;
             characterIndex += 1) {

            if (self._matchCharacter(0, stringToMatch, characterIndex)) {
                isMatch = true;
                break;
            }
        }

        return isMatch;
    };
}