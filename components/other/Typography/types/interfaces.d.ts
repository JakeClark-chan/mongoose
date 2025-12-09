export declare type TypographyType = 'bigTitle' | 'Title1' | 'title' | 'Title2' | 'smallTitle' | 'Title3' | 'headline' | 'Headline' | 'subtitle' | 'Subtitle1' | 'strikethroughSubtitle' | 'Subtitle1None' | 'smallSubtitle' | 'Subtitle2' | 'body' | 'Body1' | 'boldBody' | 'Body1B' | 'strikethroughBody' | 'Body1None' | 'smallBody' | 'Body2' | 'smallBodyBold' | 'Body2B' | 'Body2None' | 'Caption1Bold' | 'Caption1Regular' | 'Caption1None' | 'Caption2Bold' | 'Caption2Regular' | 'Caption2None' | 'HeadingH1' | 'HeadingH2' | 'HeadingH3' | 'HeadingH4' | 'HeadingH5' | 'BoldXL' | 'RegularXL' | 'UnderlineXL' | 'LinethroughXL' | 'BoldL' | 'RegularL' | 'UnderlineL' | 'LinethroughL' | 'BoldM' | 'RegularM' | 'UnderlineM' | 'LinethroughM' | 'BoldS' | 'RegularS' | 'UnderlineS' | 'LinethroughS';
export interface TypographyProps {
    component?: string;
    text?: string;
    type?: TypographyType;
}
