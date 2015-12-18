/**
 * Lists the range of a given input as a comma separated string.
 *
 * @param {string} input - The input range.
 * @param {string} [delimiter] - The character between the start and end of your range input string. By default this will work for '-' and '/'.
 * 
 * @returns {string} Comma separated list of the range.
 * 
 * @example
 * listRange("2-6")            // 2,3,4,5,6
 * listRange("2 to 6", "to")   // 2,3,4,5,6
 * listRange("2->6", "->")     // 2,3,4,5,6
 * listRange("2 - 6")          // 2,3,4,5,6
 * listRange("2/6")            // 2,3,4,5,6
 * listRange("2&6")            // 2,6
 * listRange("2 & 6-8")        // 2,6,7,8
 * listRange("2-4 & 6-8")      // 2,3,4,6,7,8
 * listRange("2/4 & 6/8")      // 2,3,4,6,7,8
 *
 * // Don't mix delimiters when indicating range:
 * listRange("2/4 & 6-8")      // 2/4,6,7,8 - Come on, at least be consistent in the input.
 */

function listRange (input, delimiter) {
    if (delimiter && delimiter.match('&')) throw new Error('Delimiter cannot be "&".');

    // Standardize input formats.
    input = input.replace(/\s/g, '');

    if (delimiter) {
        delimiter = delimiter.replace(/\s/g, '');
    } else {
        // Handle cases without a default or defined delimiter.
        if (input.match('-')) {
            delimiter = '-';
        } else if (input.match('/')) {
            delimiter = '/';
        } else if (input.match('&')) {
            // If no range, just separated numbers, convert to comma separated list.
            return input.split('&').join(',');
        } else {
            // If no delimiter and no '&', return input.
            return input;
        }
    }

    if (input.match('&')) {
        return input.split('&').reduce(function (result, current) {
            return result.concat(innerListRange(current));
        }, []).join(',');
    }

    return innerListRange(input);

    // Function that actually lists the ranges of the input or input sections.
    function innerListRange (range) {
        range = range.split(delimiter);

        // Handle single value ranges.
        if (range.length === 1) return range[0];

        var start = Math.min(range[0], range[1]);
        var end = Math.max(range[0], range[1]);

        var innerRange = [];
        for (var i = start; i <= end; i++) {
            innerRange.push(i);
        }

        return innerRange.join(',');
    }

}
