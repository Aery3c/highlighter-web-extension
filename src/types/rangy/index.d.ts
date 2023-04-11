/// <reference types="rangy/rangy-classapplier.d.ts" />

declare module 'rangy/lib/rangy-highlighter' {}
declare module 'rangy/lib/rangy-classapplier' {}
declare module 'rangy/lib/rangy-core' {}
interface CharacterRange {
	start: number;
	end: number;
	union: (charRange: CharacterRange) => CharacterRange;
}
interface Converter {
	type: 'textContent' | 'TextRange';
	characterRangeToRange: (doc: Document, characterRange: CharacterRange, containerNode: Node) => RangyRange;
	rangeToCharacterRange: (range: RangyRange, containerNode: Node) => CharacterRange;
}

interface RangyRange {
	nativeRange: Range;
}

interface RangyHighlight {
	id: number;
	applied: boolean;
	apply: () => void;
	unapply: () => void;
	characterRange: CharacterRange;
	getRange: () => RangyRange;
}

interface Highlighter {
	classAppliers: Record<string, RangyClassApplier>
	highlights: RangyHighlight[];
	converter: Converter;
	addClassApplier: (classApplier: RangyClassApplier) => void;
	highlightSelection: (className?: string, options?: { selection?: Selection; exclusive?: boolean; containerElementId?: string }) => RangyHighlight[];
	getHighlightForElement: (el: HTMLElement) => RangyHighlight | null;
	removeHighlights: (highlights: RangyHighlight[]) => void;
	deserialize: (string) => void;
	serialize: () => string;
}

interface RangyStatic {
	init: () => void;
	createHighlighter: () => Highlighter;
}