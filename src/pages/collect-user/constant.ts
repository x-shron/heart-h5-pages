const height = [{ label: "150cm以下", value: 150 }];
for (let index = 151; index < 220; index++) {
  height.push({ label: `${index}cm`, value: index });
}
height.push({ label: `${220}cm以上`, value: 220 });

export const HEIGHT_OPTIONS = height;

const age = [{ label: "18岁以下", value: 18 }];
for (let index = 19; index < 78; index++) {
  age.push({ label: `${index}岁`, value: index });
}
age.push({ label: `${78}岁以上`, value: 78 });

export const AGE_OPTIONS = age;

export const SEX_OPTIONS = [
  { label: "男", value: 0 },
  { label: "女", value: 1 },
];

export const MARRIAGE_OPTIONS = [
  { label: "未婚", value: 1 },
  { label: "离异", value: 2 },
  { label: "已婚", value: 3 },
];
