# Coordinate System & Transforms

Pax's coordinate system is "top-left origin; right is positive x; down is positive y"

<!-- TODO: image illustrating coordinate system -->

### Affine transforms (Transform2D)

The way elements get positioned, sized, and moved around in Pax is through the powerful `transform` property.  This property is nearly ubiquitous across the landscape of GUI and graphical development tools (such as `matrix3d()` in CSS), but it is more front-and-center in game engines than it is in UI layout systems.

Perhaps the easiest way to think about Pax's transform model is "design tool coordinates."  That is, when you select an element in a vector design tool like Figma, Sketch, or Illustrator, you can: _drag_ it (`translate`), _resize_ it (`scale`), _rotate_ it, and _shear_ it (with a combination of rotation and scale.)  Each of these operations can be expressed in Pax, as well.

```xml
<Group id=a transform=rotate(150deg)>
    <Rectangle id=b transform=translate(50px, 50px) />
    <Rectangle id=c transform=scale(150%, 150%) />
</Group>
```

In the above example, rectangle `b` will be moved 50px to the right and 50px down.  The rectangle `c` will be 150% the width & height of its default values.  And the group `a` will be rotated 150 degrees — which, in fact, ends up rotating both of the rectangles as well.  Read more about this below in [combining transformations.](#combining-transformations)


### Anchor & Align
Pax's coordinate system also has a notion of `anchor` — letting you set the anchored origin point for transformations.  For example, using `anchor` you can cause a rectangle to be rotated around its top-left corner, vs. rotated around its center-point.  

<!-- TODO: insert image of an Anchor UI, e.g. from Flash/AI/Figma -- or animated example -->

Pax's layout system also has a notion of `align`ment -- that is: where an element should be mounted on the screen, _relative to its parent container_.  For example: "align this element's anchor point to the _top left_ of the parent container" (`align(0%, 0%)`), or "align this element's anchor point to the _center point_ of the parent container" (`align(50%, 50%)`).

<!-- TODO: insert image illustrating alignment relative to parent container -->

The combination of `anchor` and `align` offers powerful, fine-grained positioning, well suited to responsive design for varying screen sizes.


### Combining transformations

What happens when you want to both resize AND rotate an element?  You must _combine transformations_.  Depending on your needs, there are two broad ways to combine transformations:

#### 1. Hierarchical composition

When you transform an element that can contain other elements -- such as a `<Group>...</Group>`, all of its children elements will _inherit_ that transformation as a starting point.  For example:

```
<Group id=groo >
    <Rectangle id=ree />
</Group>
```

If a `transform` is applied to the group `groo`, such as a translation by 50px to the right, all descendants (in this case, the rectangle `ree`) will also be automatically translated by 50px to the right.  This translation occurs _after_ all of `ree`'s transform logic is calculated, and is handled by Pax's core rendering engine.

This notion of hierarchical transformation may by familiar if you have used the `group` functionality of a vector design tool — specifically the behavior of individual grouped elements when you drag, rotate, or resize the whole group.  As an exercise, try making a nest multiple layers deep of groups in a vector design tool, and observe what happens to individual elements and groups when you transform the entire container.

#### 2. Matrix multiplication

Often times, you will want to combine transformations on a single element, without using any sort of nesting.  In these cases, you will want to _multiply transforms._  This entails two steps:

  1. use an expression (`{...}`) for the transform value, and
  2. multiply different affine operations within that expression

The reason multiplication is the combinational operator for transformations stems from linear algebra, where _matrix multiplication_ describes the sequential combination of _affine transformation matrices._

An example of combining multiple transformations with matrix multiplication:

```jsx
<Rectangle width=100px height=200px transform={
    rotate(100deg) *
    translate(100px, 100px) *
    scale(200%, 200%)
} />
```

In the above, the 100px square will be rotated, then translated (moved), then scaled (resized).

A few important notes about matrix multiplication:

 1. Order matters — for example `translate() * rotate()` will generally yield different behavior vs. `rotate() * translate()`.
 2. You can combine the same operation multiple times — for example `scale() * scale()` or `rotate() * scale() * rotate()`
 3. Since these multiplications happen in an `expression` context, you may also use symbolic `properties` in these expressions — for example `rotate(self.base_rotation * self.rotation_multiplier)` or `scale(self.scale_mult) * rotate(self.active_rotation)`


Organizationally, you may find that it is useful to combine hierarchical grouping with matrix multiplication in different ways.  You may also make use of helper methods which can return dynamic or pre-computed transformations.  Finally, the use of layout components (such as `pax-std`'s `Stacker`, or components that you may author yourself) allow abstraction of complex positioning and resizing logic.

--

[1] Affine transforms:  https://en.wikipedia.org/wiki/Affine_transformation

