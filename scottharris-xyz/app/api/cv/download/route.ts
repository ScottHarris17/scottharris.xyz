import { NextResponse } from "next/server";
import {
  Document,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Packer,
  TabStopPosition,
  TabStopType,
} from "docx";
import { cvData } from "@/data/cv";

/* ── Helpers ── */

const FONT = "Calibri";
const HEADING_COLOR = "0F766E";

function sectionHeading(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 120 },
    border: {
      bottom: {
        style: BorderStyle.SINGLE,
        size: 6,
        color: "CCCCCC",
      },
    },
    children: [
      new TextRun({
        text,
        bold: true,
        size: 28, // 14pt
        font: FONT,
        color: HEADING_COLOR,
      }),
    ],
  });
}

function entryParagraph(
  period: string,
  primary: string,
  secondary?: string,
  description?: string,
): Paragraph[] {
  const paragraphs: Paragraph[] = [];

  const children: TextRun[] = [
    new TextRun({
      text: period,
      size: 20,
      font: FONT,
      color: "666666",
    }),
    new TextRun({
      text: "    ",
      size: 20,
      font: FONT,
    }),
    new TextRun({
      text: primary,
      bold: true,
      size: 20,
      font: FONT,
    }),
  ];

  if (secondary) {
    children.push(
      new TextRun({
        text: " — ",
        size: 20,
        font: FONT,
        color: "666666",
      }),
      new TextRun({
        text: secondary,
        italics: true,
        size: 20,
        font: FONT,
        color: "666666",
      }),
    );
  }

  paragraphs.push(
    new Paragraph({
      spacing: { after: description ? 40 : 100 },
      tabStops: [
        {
          type: TabStopType.LEFT,
          position: TabStopPosition.MAX,
        },
      ],
      children,
    }),
  );

  if (description) {
    paragraphs.push(
      new Paragraph({
        spacing: { after: 100 },
        indent: { left: 0 },
        children: [
          new TextRun({
            text: description,
            size: 19,
            font: FONT,
            color: "444444",
          }),
        ],
      }),
    );
  }

  return paragraphs;
}

function numberedCitation(
  index: number,
  citation: string,
  status?: string,
): Paragraph {
  const children: TextRun[] = [
    new TextRun({
      text: `${index}. `,
      size: 19,
      font: FONT,
      color: "666666",
    }),
    new TextRun({
      text: citation,
      size: 19,
      font: FONT,
    }),
  ];

  if (status) {
    children.push(
      new TextRun({
        text: ` [${status}]`,
        size: 18,
        font: FONT,
        italics: true,
        color: HEADING_COLOR,
      }),
    );
  }

  return new Paragraph({
    spacing: { after: 80 },
    indent: { left: 360, hanging: 360 },
    children,
  });
}

export async function GET() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: FONT,
            size: 20,
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1000,
              bottom: 1000,
              left: 1200,
              right: 1200,
            },
          },
        },
        children: [
          /* ── Name ── */
          new Paragraph({
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: cvData.name,
                bold: true,
                size: 56, // 28pt
                font: FONT,
                color: HEADING_COLOR,
              }),
            ],
          }),

          /* ── Contact ── */
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 40 },
            children: [
              new TextRun({
                text: cvData.email,
                size: 20,
                font: FONT,
                color: "444444",
              }),
              new TextRun({
                text: "  |  ",
                size: 20,
                font: FONT,
                color: "AAAAAA",
              }),
              new TextRun({
                text: cvData.address,
                size: 20,
                font: FONT,
                color: "444444",
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "linkedin.com/in/scott-harris-phd",
                size: 18,
                font: FONT,
                color: "0F766E",
              }),
              new TextRun({
                text: "  |  ",
                size: 18,
                font: FONT,
                color: "AAAAAA",
              }),
              new TextRun({
                text: "github.com/scottharris17",
                size: 18,
                font: FONT,
                color: "0F766E",
              }),
            ],
          }),

          /* ── Education ── */
          sectionHeading("Education"),
          ...cvData.education.flatMap((edu) =>
            entryParagraph(
              edu.period,
              edu.degree,
              `${edu.institution}, ${edu.location}`,
              edu.details,
            ),
          ),

          /* ── Professional Positions ── */
          sectionHeading("Professional Positions"),
          ...cvData.positions.flatMap((pos) =>
            entryParagraph(pos.period, pos.title, pos.organization, pos.description),
          ),

          /* ── Things I Have Built ── */
          sectionHeading("Things I Have Built"),
          ...cvData.software.flatMap((sw) => {
            const parts: Paragraph[] = [
              new Paragraph({
                spacing: { after: 40 },
                children: [
                  new TextRun({
                    text: sw.name,
                    bold: true,
                    size: 20,
                    font: FONT,
                  }),
                  new TextRun({
                    text: ` — ${sw.description}`,
                    size: 19,
                    font: FONT,
                    color: "444444",
                  }),
                ],
              }),
              new Paragraph({
                spacing: { after: sw.outcome ? 40 : 100 },
                children: [
                  new TextRun({
                    text: `Tools: ${sw.tools}`,
                    size: 18,
                    font: FONT,
                    color: "666666",
                    italics: true,
                  }),
                ],
              }),
            ];
            if (sw.outcome) {
              parts.push(
                new Paragraph({
                  spacing: { after: 100 },
                  children: [
                    new TextRun({
                      text: `Outcome: ${sw.outcome}`,
                      size: 19,
                      font: FONT,
                      color: HEADING_COLOR,
                    }),
                  ],
                }),
              );
            }
            return parts;
          }),

          /* ── Fellowships & Awards ── */
          sectionHeading("Fellowships & Awards"),
          ...cvData.awards.flatMap((a) =>
            entryParagraph(a.period, a.title, a.details),
          ),

          /* ── Publications ── */
          sectionHeading("Publications"),
          ...cvData.publications.map((pub, i) =>
            numberedCitation(i + 1, pub.citation, pub.status),
          ),

          /* ── Patents ── */
          sectionHeading("Patents"),
          ...cvData.patents.map((p, i) => numberedCitation(i + 1, p.citation)),

          /* ── Invited Talks ── */
          sectionHeading("Invited Talks"),
          ...cvData.invitedTalks.map((t, i) =>
            numberedCitation(i + 1, t.citation),
          ),

          /* ── Poster Presentations ── */
          sectionHeading("Poster Presentations"),
          ...cvData.posterPresentations.map((p, i) =>
            numberedCitation(i + 1, p.citation),
          ),

          /* ── Skills ── */
          sectionHeading("Skills"),
          ...cvData.skills.map(
            (s) =>
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: `${s.category}: `,
                    bold: true,
                    size: 20,
                    font: FONT,
                  }),
                  new TextRun({
                    text: s.items,
                    size: 20,
                    font: FONT,
                    color: "444444",
                  }),
                ],
              }),
          ),

          /* ── Teaching ── */
          sectionHeading("Teaching"),
          ...cvData.teaching.flatMap((t) =>
            entryParagraph(t.period, t.role),
          ),

          /* ── Coursework ── */
          sectionHeading("Coursework"),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: cvData.coursework,
                size: 20,
                font: FONT,
                color: "444444",
              }),
            ],
          }),

          /* ── Portfolios ── */
          sectionHeading("Portfolios"),
          ...cvData.portfolios.map(
            (p) =>
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: `${p.name}: `,
                    bold: true,
                    size: 20,
                    font: FONT,
                  }),
                  new TextRun({
                    text: p.url,
                    size: 20,
                    font: FONT,
                    color: HEADING_COLOR,
                  }),
                ],
              }),
          ),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const uint8 = new Uint8Array(buffer);

  return new NextResponse(uint8, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": "attachment; filename=CV_ScottHarris.docx",
    },
  });
}
