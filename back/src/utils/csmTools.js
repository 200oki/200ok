/*
# TODAY_YEAR = datetime.date.today().year
TODAY_YEAR = 2020   # 윤년
TODAY_LEAP = calendar.isleap(TODAY_YEAR)
DAYMOD = 183.0 if TODAY_LEAP else 182.5

def compare_simple(a, b):
  return 0.0 if a == b else 1.0

def compare_set(a: set, b: set):
  return 1.0 - len(a & b)/max(len(a), len(b))

def to_yday(bdstr: str) -> int:
  m, d = map(int, bdstr.split('-'))
  return datetime.date(TODAY_YEAR, m, d).timetuple().tm_yday

def compare_yday(a: str, b: str):
  a = to_yday(a)
  b = to_yday(b)
  delta = abs(a - b)
  if delta < DAYMOD:
    result = abs(delta)
  else:
    result = DAYMOD*2 - delta
  return result / DAYMOD
*/

class CharacterCategoricalComparison {
  constructor({ birthday, hobby, personality, colors, styles }) {
    Object.assign(this, arguments[0]);
  }

  templateSimple(a, b) {
    return (b) => {
      return a === b ? 0 : 1;
    };
  }

  templateIntersection(a, b) {}

  templateYday() {}

  compareBirthday = compareSimple(birthday);
}
