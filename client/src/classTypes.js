// @flow

export class User {
  mail: string;
  firstName: string;
  lastName: string;
  password: string;
  typeName: string;
  phone: string;
  points: number;
  countyId: number;
  active: number;

  constructor(
    mail: string,
    firstName: string,
    lastName: string,
    typeName: string,
    phone: string,
    points: number,
    countyId: number,
    active: number
  ) {
    this.mail = mail;
    this.firstName = firstName;
    this.lastName = lastName;
    this.typeName = typeName;
    this.phone = phone;
    this.points = points;
    this.countyId = countyId;
    this.active = active;
  }
}

export class Issue {
  issueId: number;
  userMail: string;
  latitude: number;
  longitude: number;
  text: string;
  pic: string;
  date: string;
  statusName: string;
  categoryId: number;
  countyId: number;
  active: number;

  constructor(
    issueId: number,
    userMail: string,
    latitude: number,
    longitude: number,
    text: string,
    pic: string,
    date: string,
    statusName: string,
    categoryId: number,
    countyId: number,
    active: number
  ) {
    this.issueId = issueId;
    this.userMail = userMail;
    this.latitude = latitude;
    this.longitude = longitude;
    this.text = text;
    this.pic = pic;
    this.date = date;
    this.statusName = statusName;
    this.categoryId = categoryId;
    this.countyId = countyId;
    this.active = active;
  }
}

export class Type {
  typeName: string;
  active: number;

  constructor(typeName: string, active: number) {
    this.typeName = typeName;
    this.active = active;
  }
}

export class EventCategory {
  eventCategoryId: number;
  name: string;
  active: number;

  constructor(eventCategoryId: number, name: string, active: number) {
    this.eventCategoryId = eventCategoryId;
    this.name = name;
    this.active = active;
  }
}

export class Category {
  categoryId: number;
  name: string;
  priority: number;
  active: number;

  constructor(
    categoryId: number,
    name: string,
    priority: number,
    active: number
  ) {
    this.categoryId = categoryId;
    this.name = name;
    this.priority = priority;
    this.active = active;
  }
}

export class Category2 extends Category {
  category2Id: number;

  constructor(
    categoryId: number,
    category2Id: number,
    name: string,
    priority: number,
    active: number
  ) {
    // noinspection JSAnnotator
    this.category2Id = categoryId;

    super(category2Id, name, priority, active);
  }
}

export class Category3 extends Category {
  category2Id: number;

  constructor(
    categoryId2: number,
    categoryId3: number,
    name: string,
    priority: number,
    active: number
  ) {
    // noinspection JSAnnotator
    this.category2Id = categoryId2;

    super(categoryId3, name, priority, active);
  }
}

export class Event {
  eventId: number;
  title: string;
  text: string;
  date: string;
  userMail: string;
  active: number;

  constructor(
    eventId: number,
    title: string,
    text: string,
    date: string,
    userMail: string,
    active: number
  ) {
    this.eventId = eventId;
    this.title = title;
    this.text = text;
    this.date = date;
    this.userMail = userMail;
    this.active = active;
  }
}

export class Status {
  progressBar: String;
  progress: number;

  constructor(status: string) {
    //if issue is registered
    if (status === "Registered") {
      this.progressBar = "info";
      this.progress = 100;

      //if issue is under processing
    } else if (status === "In progress") {
      this.progressBar = "warning";
      this.progress = 50;
      //if issue is resolved
    } else {
      this.progressBar = "success";
      this.progress = 100;
    } //end condition
  } //end constructor
} //end class

export class Company {
  companyMail: string;
  companyName: string;
  firstName: string;
  lastName: string;
  adresse: string;
  postnr: string;
  password: string;
  phone: number;
}
