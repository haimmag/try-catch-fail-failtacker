// Type definitions for string extra
// Project: http://underscorejs.org/
// Definitions by: Boris Yankov <https://github.com/borisyankov/>, Josh Baldwin <https://github.com/jbaldwin/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface String {
    startsWith(prefix: string): boolean;
    endsWith(suffix: string): boolean;
    trim(): string;
    trimEnd(): string;
    trimStart(): string;    
}

