
// Part 2
pub fn main() {
    let lines: Vec<usize> = include_str!("../puzzle.txt")
        .lines()
        .map(|l| l.parse::<usize>().unwrap())
        .collect();

    // [(199, 200, 208 => sum), etc.] => to tuples again
    let sums: Vec<usize> = lines.iter()
        .zip(lines.iter().skip(1))
        .zip(lines.iter().skip(2))
        .map(|((x, y), z)| (x + y + z))
        .collect();

    let tuples = sums.iter()
        .zip(sums.iter().skip(1));

    let mut result = 0;

    for t in tuples {
        let (a, b) = t;

        if b > a {
            result += 1;
        }
    }

    println!("{}", result);
}

pub fn part1() {
    // Macro to open a file and convert input to numbers
    let lines: Vec<usize> = include_str!("../puzzle.txt")
        .lines()
        .map(|l| l.parse::<usize>().unwrap())
        .collect();

    // [(199, 200), (200, 208), etc.]
    let tuples = lines.iter()
        .zip(lines.iter().skip(1));

    let mut result = 0;

    for t in tuples {
        let (a, b) = t;

        if b > a {
            result += 1;
        }
    }

    println!("{}", result);
}
