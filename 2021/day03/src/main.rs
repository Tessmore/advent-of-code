
// Part 2:
// Run part 1 first to get the digits to keep. Then run part 2
pub fn main() {
    let lines = include_str!("../input.txt")
        .lines()
        .collect::<Vec<_>>();

    // let lines2 = lines.clone();

    // let mut tuples: Vec<(i32, usize)> = Vec::new();

    // for l in lines {
    //     for (i, c) in l.chars().enumerate() {
    //         tuples.push(
    //             (
    //                 c as i32 - 0x30,
    //                 i
    //             )
    //         );
    //     }
    // }

    // let mut gamma = String::from("");
    // let mut epsilon = String::from("");

    // for l in lines2 {
    //     for (i, _c) in l.chars().enumerate() {
    //         let ones = tuples
    //             .iter()
    //             .filter(|(a, b)| a == &0 && b == &i)
    //             .map(|(a, _b)| a)
    //             .collect::<Vec<_>>();

    //         let zeroes = tuples
    //             .iter()
    //             .filter(|(a, b)| a == &1 && b == &i)
    //             .map(|(a, _b)| a)
    //             .collect::<Vec<_>>();


    //         if ones.len() < zeroes.len() {
    //             gamma.push('1');
    //             epsilon.push('0');
    //         }
    //         else {
    //             gamma.push('0');
    //             epsilon.push('1');
    //         }
    //     }

    //     break;
    // }

    let (gamma, epsilon) = part1(lines);

    println!("{:?}", gamma);
    println!("{:?}", epsilon);

    // Convert binary to integer
    let gamma_nr = isize::from_str_radix(&gamma, 2).unwrap();
    let epsilon_nr = isize::from_str_radix(&epsilon, 2).unwrap();

    println!("{:?}", gamma_nr * epsilon_nr);
}

pub fn part1(lines: Vec<&str>) -> (String, String) {
    let lines2 = lines.clone();

    let mut tuples: Vec<(i32, usize)> = Vec::new();

    for l in lines {
        for (i, c) in l.chars().enumerate() {
            tuples.push(
                (
                    c as i32 - 0x30,
                    i
                )
            );
        }
    }

    let mut gamma = String::from("");
    let mut epsilon = String::from("");

    for l in lines2 {
        for (i, _c) in l.chars().enumerate() {
            let ones = tuples
                .iter()
                .filter(|(a, b)| a == &0 && b == &i)
                .map(|(a, _b)| a)
                .collect::<Vec<_>>();

            let zeroes = tuples
                .iter()
                .filter(|(a, b)| a == &1 && b == &i)
                .map(|(a, _b)| a)
                .collect::<Vec<_>>();


            if ones.len() < zeroes.len() {
                gamma.push('1');
                epsilon.push('0');
            }
            else {
                gamma.push('0');
                epsilon.push('1');
            }
        }

        break;
    }

    return (gamma, epsilon);

    // // Convert binary to integer
    // let gamma_nr = isize::from_str_radix(&gamma, 2).unwrap();
    // let epsilon_nr = isize::from_str_radix(&epsilon, 2).unwrap();

    // println!("{:?}", gamma_nr * epsilon_nr);
}
