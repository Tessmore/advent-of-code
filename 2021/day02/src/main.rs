
#[derive(Debug)]
enum Directions {
    Forward,
    Down,
    Up
}

impl Directions {
    fn from_str(input: &str) -> Option<Directions> {
        match input {
            "up"  => Some(Directions::Up),
            "down"  => Some(Directions::Down),
            "forward"  => Some(Directions::Forward),
            _ => None,
        }
    }
}

pub fn main() {
    let lines = include_str!("../puzzle.txt")
        .lines()
        .map(|l| {
            let mut s = l.split(" ");

            (
                Directions::from_str(s.next().unwrap()).unwrap(),
                s.next().unwrap().parse::<usize>().unwrap()
            )
        });

    let mut aim = 0;
    let mut depth = 0;
    let mut horizontal = 0;

    for l in lines {
        let (direction, amount) = l;

        match direction {
            Directions::Up => {
                // Part 1)
                // depth -= amount;
                aim -= amount;
            },
            Directions::Down => {
                // Part 1)
                // depth += amount;
                aim += amount;
            },
            Directions::Forward => {
                horizontal += amount;
                depth += amount * aim;
            }
        }
    }

    println!("{:?}", horizontal * depth);
}
