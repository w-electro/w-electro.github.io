const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

// W for Electronics brand colors
const BRAND_CYAN = rgb(0.129, 0.588, 0.722); // #0891b2
const BRAND_ORANGE = rgb(0.976, 0.451, 0.086); // #f97316
const BRAND_DARK = rgb(0.149, 0.196, 0.220); // #263238
const WHITE = rgb(1, 1, 1);
const LIGHT_GRAY = rgb(0.95, 0.95, 0.95);

async function createPDF(title, subtitle, content, outputPath, category) {
    const pdfDoc = await PDFDocument.create();
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Cover Page
    const coverPage = pdfDoc.addPage([595.28, 841.89]); // A4 size
    const { width, height } = coverPage.getSize();

    // Background gradient effect (using rectangles)
    coverPage.drawRectangle({
        x: 0,
        y: 0,
        width: width,
        height: height,
        color: rgb(0.925, 0.969, 0.984), // Light cyan background
    });

    // Top decorative bar
    coverPage.drawRectangle({
        x: 0,
        y: height - 120,
        width: width,
        height: 120,
        color: BRAND_CYAN,
    });

    // Orange accent stripe
    coverPage.drawRectangle({
        x: 0,
        y: height - 130,
        width: width,
        height: 10,
        color: BRAND_ORANGE,
    });

    // Logo placeholder - W
    coverPage.drawRectangle({
        x: width / 2 - 40,
        y: height - 100,
        width: 80,
        height: 80,
        color: WHITE,
        borderColor: BRAND_ORANGE,
        borderWidth: 3,
    });

    coverPage.drawText('W', {
        x: width / 2 - 18,
        y: height - 80,
        size: 48,
        font: helveticaBold,
        color: BRAND_CYAN,
    });

    // Category badge
    const categoryColors = {
        games: BRAND_ORANGE,
        books: BRAND_CYAN,
        novels: rgb(0.5, 0.3, 0.7) // Purple for novels
    };

    const categoryLabels = {
        games: 'GAMES',
        books: 'BOOKS',
        novels: 'NOVELS'
    };

    coverPage.drawRectangle({
        x: width / 2 - 60,
        y: height - 200,
        width: 120,
        height: 30,
        color: categoryColors[category] || BRAND_CYAN,
    });

    coverPage.drawText(categoryLabels[category] || 'DIGITAL', {
        x: width / 2 - 30,
        y: height - 192,
        size: 14,
        font: helveticaBold,
        color: WHITE,
    });

    // Title area - decorative box
    coverPage.drawRectangle({
        x: 50,
        y: height - 450,
        width: width - 100,
        height: 200,
        color: WHITE,
        borderColor: BRAND_CYAN,
        borderWidth: 2,
    });

    // Title
    const titleSize = title.length > 20 ? 28 : 36;
    coverPage.drawText(title, {
        x: 70,
        y: height - 320,
        size: titleSize,
        font: helveticaBold,
        color: BRAND_DARK,
        maxWidth: width - 140,
    });

    // Subtitle
    coverPage.drawText(subtitle, {
        x: 70,
        y: height - 380,
        size: 16,
        font: helveticaFont,
        color: rgb(0.4, 0.4, 0.4),
        maxWidth: width - 140,
    });

    // Bottom branding bar
    coverPage.drawRectangle({
        x: 0,
        y: 0,
        width: width,
        height: 80,
        color: BRAND_DARK,
    });

    coverPage.drawText('W FOR ELECTRONICS', {
        x: 50,
        y: 45,
        size: 18,
        font: helveticaBold,
        color: WHITE,
    });

    coverPage.drawText('www.w-electro.com', {
        x: 50,
        y: 25,
        size: 12,
        font: helveticaFont,
        color: rgb(0.7, 0.7, 0.7),
    });

    coverPage.drawText('Digital Products', {
        x: width - 150,
        y: 35,
        size: 14,
        font: helveticaFont,
        color: BRAND_ORANGE,
    });

    // Content pages
    const contentPages = content.split('\n\n---PAGE---\n\n');

    for (let i = 0; i < contentPages.length; i++) {
        const page = pdfDoc.addPage([595.28, 841.89]);

        // Page header
        page.drawRectangle({
            x: 0,
            y: height - 50,
            width: width,
            height: 50,
            color: LIGHT_GRAY,
        });

        page.drawText('W', {
            x: 30,
            y: height - 35,
            size: 24,
            font: helveticaBold,
            color: BRAND_CYAN,
        });

        page.drawRectangle({
            x: 50,
            y: height - 40,
            width: 3,
            height: 30,
            color: BRAND_ORANGE,
        });

        page.drawText(title, {
            x: 65,
            y: height - 35,
            size: 14,
            font: helveticaBold,
            color: BRAND_DARK,
        });

        page.drawText(`Page ${i + 1}`, {
            x: width - 70,
            y: height - 35,
            size: 12,
            font: helveticaFont,
            color: rgb(0.5, 0.5, 0.5),
        });

        // Content area
        const lines = contentPages[i].split('\n');
        let yPosition = height - 100;

        for (const line of lines) {
            if (yPosition < 100) break;

            // Check if it's a heading (starts with #)
            if (line.startsWith('## ')) {
                yPosition -= 20;
                page.drawText(line.replace('## ', ''), {
                    x: 50,
                    y: yPosition,
                    size: 18,
                    font: helveticaBold,
                    color: BRAND_CYAN,
                });
                yPosition -= 30;
            } else if (line.startsWith('# ')) {
                yPosition -= 25;
                page.drawText(line.replace('# ', ''), {
                    x: 50,
                    y: yPosition,
                    size: 24,
                    font: helveticaBold,
                    color: BRAND_DARK,
                });
                yPosition -= 35;
            } else if (line.trim()) {
                // Regular text - wrap long lines
                const words = line.split(' ');
                let currentLine = '';

                for (const word of words) {
                    const testLine = currentLine + (currentLine ? ' ' : '') + word;
                    if (testLine.length > 80) {
                        page.drawText(currentLine, {
                            x: 50,
                            y: yPosition,
                            size: 12,
                            font: helveticaFont,
                            color: BRAND_DARK,
                        });
                        yPosition -= 20;
                        currentLine = word;
                    } else {
                        currentLine = testLine;
                    }
                }

                if (currentLine) {
                    page.drawText(currentLine, {
                        x: 50,
                        y: yPosition,
                        size: 12,
                        font: helveticaFont,
                        color: BRAND_DARK,
                    });
                    yPosition -= 20;
                }
            } else {
                yPosition -= 15;
            }
        }

        // Page footer
        page.drawRectangle({
            x: 0,
            y: 0,
            width: width,
            height: 40,
            color: BRAND_DARK,
        });

        page.drawText('W FOR ELECTRONICS | www.w-electro.com', {
            x: width / 2 - 120,
            y: 15,
            size: 10,
            font: helveticaFont,
            color: rgb(0.7, 0.7, 0.7),
        });
    }

    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(outputPath, pdfBytes);
    console.log(`Created: ${outputPath}`);
}

// Games content
const gamesContent = [
    {
        title: 'Brain Teasers Collection',
        subtitle: 'Challenge Your Mind - Volume 1',
        content: `# Brain Teasers Collection

## Introduction

Welcome to the W for Electronics Brain Teasers Collection! This PDF contains a variety of puzzles and games designed to challenge your mind and improve your cognitive abilities.

## Puzzle 1: Number Sequence

What comes next in this sequence?
2, 6, 12, 20, 30, ?

Think carefully about the pattern between each number.

## Puzzle 2: Logic Problem

Three friends - Ahmed, Sara, and Khalid - each have a different favorite color: red, blue, and green.
- Ahmed's favorite color is not red.
- Sara's favorite color is not blue.
- Khalid's favorite color is green.

What is each person's favorite color?

---PAGE---

## Puzzle 3: Word Puzzle

Rearrange the letters to form a word:
T - E - C - H - N - O - L - O - G - Y

Hint: It's something W for Electronics specializes in!

## Puzzle 4: Math Challenge

If you have 3 apples and you take away 2, how many apples do you have?

Think carefully - this is a trick question!

## Puzzle 5: Pattern Recognition

Complete the pattern:
Circle, Square, Triangle, Circle, Square, ?

## Answers Section

1. Number Sequence: 42 (difference increases by 2 each time: +4, +6, +8, +10, +12)
2. Logic Problem: Ahmed - Blue, Sara - Red, Khalid - Green
3. Word Puzzle: TECHNOLOGY
4. Math Challenge: You have 2 apples (the ones you took!)
5. Pattern Recognition: Triangle

---PAGE---

## Sudoku Puzzle

A classic 4x4 Sudoku for beginners:

+---+---+---+---+
| 1 |   | 3 |   |
+---+---+---+---+
|   | 3 |   | 1 |
+---+---+---+---+
| 3 |   | 1 |   |
+---+---+---+---+
|   | 1 |   | 3 |
+---+---+---+---+

Fill in the grid so each row, column, and 2x2 box contains the numbers 1-4.

## Crossword Mini

Across:
1. Electronic device for computing (8 letters)
3. Global network (8 letters)

Down:
2. W for Electronics' specialty (10 letters)

## More Games Coming Soon!

Visit www.w-electro.com for more digital products and services.

Thank you for choosing W for Electronics!`,
        filename: 'brain-teasers-vol1.pdf'
    },
    {
        title: 'Word Games Collection',
        subtitle: 'Fun with Words - Volume 1',
        content: `# Word Games Collection

## Welcome!

This collection features word-based games and puzzles that are both fun and educational. Perfect for all ages!

## Word Search #1: Technology Terms

Find these words in the grid:
- COMPUTER
- INTERNET
- DIGITAL
- SOFTWARE
- HARDWARE

C O M P U T E R X Y
D I G I T A L Z W V
H A R D W A R E Q P
S O F T W A R E N M
I N T E R N E T L K

---PAGE---

## Anagram Challenge

Rearrange these letters to form technology-related words:

1. BEISWET = ?
2. LAEISM = ?
3. TADAS = ?
4. DOLUC = ?
5. CODER = ?

## Fill in the Blanks

Complete these sentences:

1. W for Electronics provides excellent _______ services.
2. The _______ is a global network connecting computers.
3. A _______ is a portable computer.
4. _______ is used to create websites.

## Answers

Anagrams: 1. WEBSITE, 2. EMAILS, 3. DATAS, 4. CLOUD, 5. CORED
Fill in: 1. Electronic, 2. Internet, 3. Laptop, 4. HTML

---PAGE---

## Vocabulary Builder

Learn these tech terms:

1. Algorithm: A set of instructions for solving a problem
2. Database: An organized collection of data
3. Interface: The point of interaction between user and computer
4. Protocol: Rules for data communication
5. Encryption: Converting data into a secure format

## Word Scramble Game

Unscramble these words:

1. GLOPNRMRAIG = ?
2. TYRSICUE = ?
3. WADNOOLD = ?
4. DOAPUL = ?

Answers: Programming, Security, Download, Upload

Thank you for using W for Electronics Digital Products!`,
        filename: 'word-games-vol1.pdf'
    },
    {
        title: 'Math Puzzles Collection',
        subtitle: 'Numbers and Logic - Volume 1',
        content: `# Math Puzzles Collection

## Introduction

Sharpen your mathematical skills with these fun and challenging puzzles from W for Electronics!

## Easy Level

1. What is 15 + 27?
2. If you multiply 6 by 8, what do you get?
3. What is half of 84?
4. 100 - 37 = ?

## Medium Level

1. Find X: 3X + 5 = 20
2. What is 25% of 200?
3. If a rectangle has length 8 and width 5, what is its area?
4. What is the next prime number after 17?

---PAGE---

## Hard Level

1. Solve: 2^5 + 3^3 = ?
2. If the radius of a circle is 7, what is its circumference? (Use pi = 22/7)
3. Find the missing number: 1, 4, 9, 16, ?, 36
4. What is 15% of 300?

## Logic Puzzles

1. A farmer has 17 sheep. All but 9 run away. How many sheep are left?

2. If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?

3. A bat and a ball cost $1.10 together. The bat costs $1.00 more than the ball. How much does the ball cost?

---PAGE---

## Answers

Easy Level:
1. 42
2. 48
3. 42
4. 63

Medium Level:
1. X = 5
2. 50
3. 40 square units
4. 19

Hard Level:
1. 32 + 27 = 59
2. 44 (2 x 22/7 x 7 = 44)
3. 25 (perfect squares)
4. 45

Logic Puzzles:
1. 9 sheep
2. 5 minutes
3. $0.05

Great job completing these puzzles!
Visit www.w-electro.com for more!`,
        filename: 'math-puzzles-vol1.pdf'
    }
];

// Books content
const booksContent = [
    {
        title: 'Introduction to Technology',
        subtitle: 'A Beginner\'s Guide to the Digital World',
        content: `# Introduction to Technology

## Chapter 1: What is Technology?

Technology refers to the application of scientific knowledge for practical purposes. In our modern world, technology surrounds us in everything we do - from the smartphones we use to the cars we drive.

At W for Electronics, we believe everyone should understand and benefit from technology. This guide will help you navigate the digital world with confidence.

## The Evolution of Technology

Technology has evolved dramatically over the centuries:
- Ancient times: Simple tools and wheels
- Industrial Revolution: Steam engines and factories
- 20th Century: Electricity, telephones, computers
- 21st Century: Internet, smartphones, AI

---PAGE---

## Chapter 2: Understanding Computers

A computer is an electronic device that processes information. Here are the basic components:

## Hardware Components

1. Central Processing Unit (CPU): The brain of the computer
2. Memory (RAM): Temporary storage for active tasks
3. Storage (HDD/SSD): Permanent data storage
4. Monitor: Displays visual output
5. Keyboard and Mouse: Input devices

## Software

Software refers to programs and applications:
- Operating Systems: Windows, macOS, Linux
- Applications: Word processors, browsers, games
- Apps: Mobile applications for smartphones

---PAGE---

## Chapter 3: The Internet

The Internet is a global network connecting billions of devices worldwide.

## How the Internet Works

1. Data travels through cables and satellites
2. Servers store and distribute information
3. Routers direct traffic between networks
4. Your device connects through an ISP (Internet Service Provider)

## Internet Safety Tips

- Use strong, unique passwords
- Enable two-factor authentication
- Be cautious with personal information
- Keep software updated
- Use secure (HTTPS) websites

---PAGE---

## Chapter 4: Mobile Technology

Smartphones have revolutionized how we communicate and access information.

## Smartphone Features

- Communication: Calls, texts, video chat
- Internet: Browse, email, social media
- Camera: Photos and videos
- Apps: Thousands of applications
- GPS: Navigation and location services

## Tips for Smartphone Users

1. Protect your phone with a password or biometrics
2. Regularly backup your data
3. Be mindful of app permissions
4. Monitor data usage
5. Keep your phone updated

Thank you for reading!
W for Electronics - Breaking the Technology Barrier`,
        filename: 'intro-to-technology.pdf'
    },
    {
        title: 'Digital Skills Handbook',
        subtitle: 'Essential Skills for the Modern World',
        content: `# Digital Skills Handbook

## Introduction

In today's digital age, having strong digital skills is essential for success. This handbook from W for Electronics will guide you through the fundamental skills you need.

## Chapter 1: Basic Computer Skills

Every digital journey starts with understanding how to use a computer effectively.

## Essential Skills

1. Turning on/off the computer properly
2. Using the mouse and keyboard
3. Navigating the desktop and file system
4. Opening and closing applications
5. Creating and organizing folders

---PAGE---

## Chapter 2: Word Processing

Word processing is one of the most important digital skills.

## Key Features to Master

- Creating new documents
- Formatting text (bold, italic, underline)
- Adjusting fonts and sizes
- Adding headers and footers
- Inserting images and tables
- Saving and exporting documents

## Tips for Better Documents

1. Use consistent formatting throughout
2. Choose readable fonts
3. Use headings to organize content
4. Proofread before finalizing
5. Save regularly to avoid losing work

---PAGE---

## Chapter 3: Email Communication

Email remains a crucial form of professional communication.

## Email Best Practices

1. Use a professional email address
2. Write clear, descriptive subject lines
3. Keep messages concise and focused
4. Use proper grammar and spelling
5. Be cautious with attachments
6. Respond promptly to important emails

## Email Structure

- Subject Line: Clear and specific
- Greeting: Professional and appropriate
- Body: Concise and well-organized
- Closing: Polite and professional
- Signature: Include contact information

---PAGE---

## Chapter 4: Internet Research

The ability to find reliable information online is invaluable.

## Effective Search Techniques

1. Use specific keywords
2. Use quotation marks for exact phrases
3. Filter results by date or type
4. Check multiple sources
5. Evaluate source credibility

## Evaluating Sources

Ask these questions:
- Who is the author?
- When was it published?
- What is the purpose?
- Is the information verified?
- Are sources cited?

W for Electronics - Empowering Digital Skills`,
        filename: 'digital-skills-handbook.pdf'
    },
    {
        title: 'Internet Safety Guide',
        subtitle: 'Protecting Yourself Online',
        content: `# Internet Safety Guide

## Introduction

The internet offers incredible opportunities, but it also comes with risks. This guide from W for Electronics will help you stay safe online.

## Chapter 1: Password Security

Your passwords are your first line of defense.

## Creating Strong Passwords

1. Use at least 12 characters
2. Mix uppercase and lowercase letters
3. Include numbers and symbols
4. Avoid personal information
5. Use unique passwords for each account

## Password Management

- Consider using a password manager
- Enable two-factor authentication
- Change passwords after security breaches
- Never share passwords with others

---PAGE---

## Chapter 2: Recognizing Threats

Learn to identify common online threats.

## Phishing

Phishing attempts to steal your information through fake emails or websites.

Warning signs:
- Urgent or threatening language
- Requests for personal information
- Suspicious sender addresses
- Poor grammar and spelling
- Unusual links or attachments

## Malware

Malware is malicious software designed to harm your device.

Types:
- Viruses
- Ransomware
- Spyware
- Trojans

---PAGE---

## Chapter 3: Safe Browsing

Practice safe habits when browsing the internet.

## Best Practices

1. Keep your browser updated
2. Look for HTTPS in URLs
3. Don't click suspicious links
4. Avoid downloading from unknown sources
5. Use ad blockers cautiously
6. Clear browsing data regularly

## Social Media Safety

1. Review privacy settings
2. Be careful what you share
3. Think before you post
4. Verify friend requests
5. Report suspicious activity

---PAGE---

## Chapter 4: Protecting Your Devices

Keep all your devices secure.

## Device Security Tips

1. Install antivirus software
2. Keep operating systems updated
3. Enable device encryption
4. Use screen locks
5. Backup important data
6. Be careful with public Wi-Fi

## When Using Public Networks

- Avoid accessing sensitive accounts
- Use a VPN if possible
- Don't make financial transactions
- Turn off automatic Wi-Fi connection

Stay Safe Online with W for Electronics!`,
        filename: 'internet-safety-guide.pdf'
    }
];

// Novels content
const novelsContent = [
    {
        title: 'The Digital Pioneer',
        subtitle: 'A Short Story by W for Electronics',
        content: `# The Digital Pioneer

## A Short Story

The sun was setting over Riyadh when Ahmed first opened the mysterious package that would change his life forever. Inside was a simple laptop, accompanied by a note: "Break the technology barrier."

Ahmed was sixty-three years old and had never touched a computer in his life. His grandchildren spoke of things he didn't understand - apps, clouds, streaming. It all seemed like magic, unreachable magic meant for the young.

But something about that note spoke to him.

---PAGE---

## Chapter 1: The First Step

The laptop hummed to life with a soft glow. Ahmed stared at the screen, his weathered hands hovering uncertainly above the keyboard.

"Grandfather, you pressed it!" His granddaughter Nora appeared beside him, her eyes bright with excitement. "See? It's not so scary."

Ahmed smiled. "At my age, everything new is a little scary."

"But you've learned so many things in your life," Nora said, settling beside him. "This is just one more thing."

She guided his finger to the trackpad. "This is how you move the little arrow on the screen."

Ahmed watched in wonder as the cursor danced across the display.

---PAGE---

## Chapter 2: A New World

Days turned into weeks. Ahmed practiced every evening, his progress slow but steady. He learned to type his name, to open programs, to navigate the internet.

One morning, he discovered video calls.

"Can I really see my sister in Egypt?" he asked Nora, hardly daring to believe it.

"Let's try!"

The screen flickered, and suddenly there was Fatima, his sister whom he hadn't seen in five years. Tears streamed down both their faces as they talked, the technology that had once seemed like a barrier now serving as a bridge.

---PAGE---

## Chapter 3: Breaking Barriers

Ahmed's journey was not without challenges. He accidentally deleted files, got confused by updates, and once spent an entire afternoon trying to unmute himself on a video call.

But with each mistake came learning. With each frustration came growth.

He started helping other seniors in his neighborhood. "If I can learn," he would tell them, "anyone can."

The technology barrier he had feared for so long was not a wall at all - it was a door. And he had finally found the courage to walk through it.

THE END

---PAGE---

## Author's Note

This story is dedicated to everyone who believes they're "too old" or "not smart enough" for technology.

At W for Electronics, we believe that technology is for everyone. Our mission - "Breaking the Technology Barrier" - means making digital tools accessible and understandable for all ages and backgrounds.

Whether you're a student, a professional, or a retiree taking your first steps into the digital world, we're here to help.

Because every digital pioneer's journey begins with a single click.

www.w-electro.com
W for Electronics - Breaking the Technology Barrier`,
        filename: 'the-digital-pioneer.pdf'
    },
    {
        title: 'Connected Hearts',
        subtitle: 'A Story of Technology and Family',
        content: `# Connected Hearts

## A Short Story

Mariam looked at the package from her son in America. It had been two years since she had seen him in person, and the loneliness weighed heavily on her heart.

Inside was a tablet and a note: "Mom, I know you said technology isn't for you. But please, try this. I want to see your face."

She thought of all the phone calls where she could only hear his voice, imagining his smile instead of seeing it.

---PAGE---

## The Learning Curve

At first, the tablet was overwhelming. The screen was too bright, the icons too small, the gestures too confusing. Mariam almost gave up a dozen times.

But her neighbor's daughter, a patient young woman named Lina, came by each afternoon to help.

"Tap gently, Auntie. Yes, just like that!"

Slowly, Mariam began to understand. The symbols started making sense. The movements became natural.

## The First Video Call

The day finally came. Mariam pressed the green button and waited, her heart pounding.

And there he was - her Faisal, smiling at her from across the world.

---PAGE---

## More Than Distance

"Mom! I can see you!" Faisal's voice cracked with emotion.

Mariam touched the screen, as if she could reach through it to hold her son. "You look tired. Are you eating enough?"

Faisal laughed - that same laugh she remembered from when he was a little boy. "I've missed you, Mom."

From that day on, they talked every week. Mariam watched her grandchildren take their first steps. She was there, digitally, for birthdays and holidays. The technology she had feared became her greatest connection to her family.

## The Gift of Connection

Mariam soon became the expert in her friend group. She taught other mothers and grandmothers how to video call their families abroad.

---PAGE---

"You know," she told Lina one day, "I spent years thinking technology would make us less human, less connected. But it's done the opposite. It's brought my family closer than ever."

Lina smiled. "That's the beautiful thing about technology, Auntie. It's just a tool. What matters is what we use it for."

Mariam nodded, glancing at a photo on her tablet - a screenshot from last week's call, showing three generations of her family, all smiling at her from their different corners of the world.

Technology hadn't replaced the warmth of holding her son. But it had given her something precious: his presence in her daily life, despite the miles between them.

THE END

---PAGE---

## Closing Thoughts

In a world that often seems divided, technology has the power to bring us together. This story celebrates the connections that transcend distance and the courage it takes to embrace something new.

At W for Electronics, we understand that technology can be intimidating. That's why we're committed to making it accessible, understandable, and human.

Because at the end of the day, the most important thing about any technology is the people it connects.

Thank you for reading.

W for Electronics
Breaking the Technology Barrier
www.w-electro.com`,
        filename: 'connected-hearts.pdf'
    },
    {
        title: 'The Last Typewriter',
        subtitle: 'A Tale of Change and Adaptation',
        content: `# The Last Typewriter

## A Short Story

The old typewriter sat in the corner of Omar's office, gathering dust. Once, it had been the heart of his business - letters, contracts, invoices, all born from its mechanical keys.

Now, a sleek computer occupied his desk, and the typewriter was just a relic of a different era.

"Grandfather, why do you keep that old thing?" his granddaughter Aya asked one day.

Omar smiled. "Because it reminds me that change is not the end - it's a new beginning."

---PAGE---

## The Old Days

Omar remembered the day he had bought that typewriter, fifty years ago. He had been a young man then, starting his first business with nothing but determination and a borrowed machine.

The click-clack of the keys had been the soundtrack of his success. He had typed proposals that won contracts, letters that built relationships, and documents that sealed deals.

But the world changed. Computers arrived. Email replaced letters. Cloud storage replaced filing cabinets.

Many of Omar's contemporaries had refused to adapt. They closed their businesses, claiming the new ways were too complicated.

---PAGE---

## The Decision

Omar had stood at a crossroads. He was already in his sixties when computers became essential. Everyone said he was too old to learn.

But Omar remembered something his father had told him long ago: "The river that refuses to bend will break against the rocks."

So he bent. He learned. It wasn't easy - there were many frustrating nights, many moments of wanting to give up. But slowly, he mastered the new tools.

His business didn't just survive - it thrived.

---PAGE---

## Passing the Wisdom

"So you see," Omar told Aya, "that typewriter taught me to type. But more importantly, it taught me that tools change, but the willingness to learn never gets old."

Aya looked at her grandfather with new respect. "You adapted when others didn't."

"I did. And someday, you'll face the same choice. New technologies will come that seem impossible to understand. When that happens, remember this old typewriter."

He patted the machine fondly. "And remember that every expert was once a beginner who refused to give up."

---PAGE---

## Epilogue

Years later, when Omar had passed on, Aya found herself in a changing world of her own. New technologies emerged that seemed baffling and strange.

But she remembered her grandfather's words. She remembered the typewriter.

And she adapted.

The old typewriter still sits in the family office today, not as a tool, but as a monument to the most important lesson of all: that our ability to learn and grow never truly ages.

THE END

---PAGE---

## About This Story

This story celebrates the spirit of adaptation and lifelong learning. It's dedicated to everyone who has ever felt left behind by technology - and found the courage to catch up.

At W for Electronics, we honor both the traditions of the past and the innovations of the future. We believe that age is no barrier to learning, and that everyone deserves access to the digital world.

Whatever your background, whatever your age, we're here to help you bridge the gap between where you are and where you want to be.

W for Electronics
Breaking the Technology Barrier
www.w-electro.com`,
        filename: 'the-last-typewriter.pdf'
    }
];

async function main() {
    const baseDir = path.join(__dirname, '..', 'digital-products');

    console.log('Creating PDF files for W for Electronics...\n');

    // Create games PDFs
    console.log('Creating Games PDFs...');
    for (const game of gamesContent) {
        await createPDF(
            game.title,
            game.subtitle,
            game.content,
            path.join(baseDir, 'games', game.filename),
            'games'
        );
    }

    // Create books PDFs
    console.log('\nCreating Books PDFs...');
    for (const book of booksContent) {
        await createPDF(
            book.title,
            book.subtitle,
            book.content,
            path.join(baseDir, 'books', book.filename),
            'books'
        );
    }

    // Create novels PDFs
    console.log('\nCreating Novels PDFs...');
    for (const novel of novelsContent) {
        await createPDF(
            novel.title,
            novel.subtitle,
            novel.content,
            path.join(baseDir, 'novels', novel.filename),
            'novels'
        );
    }

    console.log('\nAll PDFs created successfully!');
}

main().catch(console.error);
